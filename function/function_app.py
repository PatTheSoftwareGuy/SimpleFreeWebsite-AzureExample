from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone
from typing import Any

from flask import Flask, Response, jsonify, request
import requests

app = Flask(__name__)

if not app.logger.handlers:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
app.logger.setLevel(logging.INFO)

MCP_PROTOCOL_VERSION = "2024-11-05"
WEATHER_TOOL_NAME = "get_weather_forecast"
HEARTBEAT_TOOL_NAME = "get_heartbeat"


def _jsonrpc_result(request_id: Any, result: dict[str, Any]) -> dict[str, Any]:
    return {
        "jsonrpc": "2.0",
        "id": request_id,
        "result": result,
    }


def _jsonrpc_error(request_id: Any, code: int, message: str) -> dict[str, Any]:
    return {
        "jsonrpc": "2.0",
        "id": request_id,
        "error": {
            "code": code,
            "message": message,
        },
    }


def _weather_tool_schema() -> dict[str, Any]:
    return {
        "name": WEATHER_TOOL_NAME,
        "description": (
            "Get an NWS forecast for a US city and state by geocoding the location "
            "to latitude/longitude and then querying api.weather.gov."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "US city name, e.g. Seattle",
                },
                "state": {
                    "type": "string",
                    "description": "US state abbreviation, e.g. WA",
                },
                "days": {
                    "type": "integer",
                    "description": "Number of forecast periods to return (1-7)",
                    "minimum": 1,
                    "maximum": 7,
                    "default": 3,
                },
            },
            "required": ["city", "state"],
            "additionalProperties": False,
        },
    }


def _heartbeat_tool_schema() -> dict[str, Any]:
    return {
        "name": HEARTBEAT_TOOL_NAME,
        "description": "Return a service heartbeat with current UTC timestamp.",
        "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": False,
        },
    }


def _heartbeat_response() -> str:
    timestamp = datetime.now(timezone.utc).isoformat()
    return (
        "Heartbeat OK\n"
        f"timestamp_utc: {timestamp}\n"
        "service: weather-mcp-webapp\n"
        "status: healthy"
    )


def _geocode_city_state(city: str, state: str) -> tuple[float, float, str]:
    base_url = os.getenv("NOMINATIM_BASE_URL", "https://nominatim.openstreetmap.org/search").strip()
    geocoder_user_agent = os.getenv(
        "NOMINATIM_USER_AGENT",
        os.getenv("NWS_USER_AGENT", "simple-chat-bubble-weather-mcp/1.0"),
    ).strip()

    response = requests.get(
        base_url,
        params={
            "city": city,
            "state": state,
            "country": "USA",
            "format": "jsonv2",
            "limit": 1,
        },
        headers={"User-Agent": geocoder_user_agent, "Accept": "application/json"},
        timeout=20,
    )
    if response.status_code != 200:
        raise ValueError(f"Geocoding failed ({response.status_code}): {response.text[:250]}")

    payload = response.json()
    if not isinstance(payload, list) or not payload:
        raise ValueError(f"No geocoding results for '{city}, {state}'.")

    first = payload[0]
    if not isinstance(first, dict):
        raise ValueError("Invalid geocoding response: missing coordinates.")

    lat_raw = first.get("lat")
    lon_raw = first.get("lon")
    if lat_raw is None or lon_raw is None:
        raise ValueError("Invalid geocoding response: missing coordinates.")

    try:
        lat = float(lat_raw)
        lon = float(lon_raw)
    except (TypeError, ValueError) as exc:
        raise ValueError("Invalid geocoding response: non-numeric coordinates.") from exc

    display_name = first.get("display_name")
    location_label = display_name if isinstance(display_name, str) and display_name.strip() else f"{city}, {state}"

    return lat, lon, location_label


def _get_forecast(lat: float, lon: float) -> dict[str, Any]:
    user_agent = os.getenv(
        "NWS_USER_AGENT",
        "simple-chat-bubble-weather-mcp/1.0 (contact: admin@example.com)",
    ).strip()

    headers = {
        "User-Agent": user_agent,
        "Accept": "application/geo+json",
    }

    points_resp = requests.get(f"https://api.weather.gov/points/{lat},{lon}", headers=headers, timeout=20)
    if points_resp.status_code != 200:
        raise ValueError(f"Weather points lookup failed ({points_resp.status_code}): {points_resp.text[:250]}")

    points = points_resp.json()
    properties = points.get("properties", {}) if isinstance(points, dict) else {}
    forecast_url = properties.get("forecast") if isinstance(properties, dict) else None
    if not forecast_url:
        raise ValueError("Weather.gov points response missing forecast URL.")

    forecast_resp = requests.get(forecast_url, headers=headers, timeout=20)
    if forecast_resp.status_code != 200:
        raise ValueError(f"Forecast lookup failed ({forecast_resp.status_code}): {forecast_resp.text[:250]}")

    forecast = forecast_resp.json()
    forecast_props = forecast.get("properties", {}) if isinstance(forecast, dict) else {}
    periods = forecast_props.get("periods") if isinstance(forecast_props, dict) else None
    if not isinstance(periods, list) or not periods:
        raise ValueError("Weather.gov forecast response contains no periods.")

    return {
        "forecast": forecast,
        "periods": periods,
    }


def _build_forecast_text(city: str, state: str, days: int) -> str:
    lat, lon, location_label = _geocode_city_state(city, state)
    weather = _get_forecast(lat, lon)
    periods = weather["periods"][:days]

    lines = [
        f"Forecast for {location_label} ({lat:.4f}, {lon:.4f})",
        "",
    ]

    for period in periods:
        if not isinstance(period, dict):
            continue

        name = str(period.get("name", "Period"))
        temp = period.get("temperature")
        temp_unit = str(period.get("temperatureUnit", "F"))
        short_forecast = str(period.get("shortForecast", ""))
        wind = f"{period.get('windSpeed', '')} {period.get('windDirection', '')}".strip()

        lines.append(f"- {name}: {temp}{temp_unit}, {short_forecast}")
        if wind:
            lines.append(f"  Wind: {wind}")

    return "\n".join(lines)


def _run_tool(name: str, arguments: dict[str, Any]) -> dict[str, Any]:
    app.logger.info("tool_call_start tool=%s args=%s", name, arguments)

    if name == HEARTBEAT_TOOL_NAME:
        result = {
            "content": [
                {
                    "type": "text",
                    "text": _heartbeat_response(),
                }
            ]
        }
        app.logger.info("tool_call_success tool=%s", name)
        return result

    if name == WEATHER_TOOL_NAME:
        city = str(arguments.get("city", "")).strip()
        state = str(arguments.get("state", "")).strip().upper()
        days_raw = arguments.get("days", 3)

        if not city:
            raise ValueError("'city' is required.")
        if not state:
            raise ValueError("'state' is required.")

        try:
            days = int(days_raw)
        except (TypeError, ValueError) as exc:
            raise ValueError("'days' must be an integer.") from exc

        if days < 1 or days > 7:
            raise ValueError("'days' must be between 1 and 7.")

        forecast_text = _build_forecast_text(city=city, state=state, days=days)

        result = {
            "content": [
                {
                    "type": "text",
                    "text": forecast_text,
                }
            ]
        }
        app.logger.info("tool_call_success tool=%s city=%s state=%s days=%s", name, city, state, days)
        return result

    app.logger.warning("tool_call_unknown tool=%s", name)
    raise ValueError(f"Unknown tool: {name}")


def _json_response(payload: dict[str, Any], status_code: int = 200) -> Response:
    return Response(json.dumps(payload), status=status_code, mimetype="application/json")


@app.get("/api/heartbeat")
def heartbeat_http() -> Response:
    app.logger.info("http_request_start endpoint=/api/heartbeat method=GET")
    try:
        result = _run_tool(HEARTBEAT_TOOL_NAME, {})
        app.logger.info("http_request_success endpoint=/api/heartbeat method=GET")
        return _json_response(result)
    except ValueError as exc:
        app.logger.warning("http_request_failure endpoint=/api/heartbeat method=GET status=400 error=%s", exc)
        return _json_response({"error": str(exc)}, status_code=400)
    except requests.RequestException as exc:
        app.logger.warning("http_request_failure endpoint=/api/heartbeat method=GET status=502 error=%s", exc)
        return _json_response({"error": f"Upstream request failed: {exc}"}, status_code=502)
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("http_request_failure endpoint=/api/heartbeat method=GET status=500")
        return _json_response({"error": f"Internal error: {exc}"}, status_code=500)


@app.get("/api/weather")
def weather_http() -> Response:
    arguments = {
        "city": request.args.get("city", ""),
        "state": request.args.get("state", ""),
        "days": request.args.get("days", "3"),
    }

    app.logger.info(
        "http_request_start endpoint=/api/weather method=GET city=%s state=%s days=%s",
        arguments["city"],
        arguments["state"],
        arguments["days"],
    )

    try:
        result = _run_tool(WEATHER_TOOL_NAME, arguments)
        app.logger.info("http_request_success endpoint=/api/weather method=GET")
        return _json_response(result)
    except ValueError as exc:
        app.logger.warning("http_request_failure endpoint=/api/weather method=GET status=400 error=%s", exc)
        return _json_response({"error": str(exc)}, status_code=400)
    except requests.RequestException as exc:
        app.logger.warning("http_request_failure endpoint=/api/weather method=GET status=502 error=%s", exc)
        return _json_response({"error": f"Upstream request failed: {exc}"}, status_code=502)
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("http_request_failure endpoint=/api/weather method=GET status=500")
        return _json_response({"error": f"Internal error: {exc}"}, status_code=500)


@app.post("/api/mcp")
def mcp() -> Response:
    request_id: Any = None

    body = request.get_json(silent=True)
    app.logger.info("http_request_start endpoint=/api/mcp method=POST")
    if body is None:
        app.logger.warning("http_request_failure endpoint=/api/mcp method=POST status=400 reason=invalid_json")
        error = _jsonrpc_error(None, -32700, "Parse error: invalid JSON body.")
        return _json_response(error)

    if not isinstance(body, dict):
        app.logger.warning("http_request_failure endpoint=/api/mcp method=POST status=400 reason=invalid_request_type")
        error = _jsonrpc_error(None, -32600, "Invalid Request: expected a JSON object.")
        return _json_response(error)

    request_id = body.get("id")
    method = body.get("method")
    params = body.get("params", {})
    app.logger.info("mcp_method_received method=%s request_id=%s", method, request_id)

    if not isinstance(method, str):
        error = _jsonrpc_error(request_id, -32600, "Invalid Request: missing method.")
        app.logger.warning("mcp_method_failure method=unknown request_id=%s error=missing_method", request_id)
        return _json_response(error)

    try:
        if method == "initialize":
            result = {
                "protocolVersion": MCP_PROTOCOL_VERSION,
                "capabilities": {
                    "tools": {},
                },
                "serverInfo": {
                    "name": "weather-mcp-webapp",
                    "version": "1.0.0",
                },
            }
            response = _jsonrpc_result(request_id, result)
            app.logger.info("mcp_method_success method=initialize request_id=%s", request_id)

        elif method == "tools/list":
            response = _jsonrpc_result(
                request_id,
                {"tools": [_weather_tool_schema(), _heartbeat_tool_schema()]},
            )
            app.logger.info("mcp_method_success method=tools/list request_id=%s", request_id)

        elif method == "tools/call":
            if not isinstance(params, dict):
                raise ValueError("Invalid params for tools/call.")

            name = params.get("name")
            arguments = params.get("arguments", {})

            if not isinstance(name, str):
                raise ValueError("tools/call requires a string 'name'.")
            if not isinstance(arguments, dict):
                raise ValueError("tools/call requires an object 'arguments'.")

            tool_result = _run_tool(name, arguments)
            response = _jsonrpc_result(request_id, tool_result)
            app.logger.info("mcp_method_success method=tools/call request_id=%s tool=%s", request_id, name)

        else:
            response = _jsonrpc_error(request_id, -32601, f"Method not found: {method}")
            app.logger.warning("mcp_method_failure method=%s request_id=%s error=method_not_found", method, request_id)

    except ValueError as exc:
        app.logger.warning("mcp_method_failure method=%s request_id=%s error=%s", method, request_id, exc)
        response = _jsonrpc_error(request_id, -32000, str(exc))
    except requests.RequestException as exc:
        app.logger.warning("mcp_method_failure method=%s request_id=%s upstream_error=%s", method, request_id, exc)
        response = _jsonrpc_error(request_id, -32001, f"Upstream request failed: {exc}")
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("mcp_method_failure method=%s request_id=%s internal_error", method, request_id)
        response = _jsonrpc_error(request_id, -32603, f"Internal error: {exc}")

    app.logger.info("http_request_end endpoint=/api/mcp method=POST")
    return _json_response(response)


@app.get("/")
def root() -> Response:
    return jsonify({"status": "ok", "service": "weather-mcp-webapp"})
