from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from typing import Any

import azure.functions as func
import requests

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

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
        "service: weather-mcp-function\n"
        "status: healthy"
    )


def _get_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise ValueError(f"Missing required environment variable: {name}")
    return value


def _geocode_city_state(city: str, state: str) -> tuple[float, float, str]:
    api_key = _get_env("LATLNG_API_KEY")
    base_url = os.getenv("LATLNG_BASE_URL", "https://api.latlng.work/api").strip()
    query = f"{city}, {state}, USA"

    response = requests.get(
        base_url,
        params={"q": query, "limit": 1, "lang": "en"},
        headers={"X-Api-Key": api_key, "Accept": "application/json"},
        timeout=20,
    )
    if response.status_code != 200:
        raise ValueError(f"Geocoding failed ({response.status_code}): {response.text[:250]}")

    payload = response.json()
    features = payload.get("features")
    if not isinstance(features, list) or not features:
        raise ValueError(f"No geocoding results for '{city}, {state}'.")

    feature = features[0]
    geometry = feature.get("geometry", {}) if isinstance(feature, dict) else {}
    coordinates = geometry.get("coordinates", []) if isinstance(geometry, dict) else []

    if not isinstance(coordinates, list) or len(coordinates) < 2:
        raise ValueError("Invalid geocoding response: missing coordinates.")

    lon = float(coordinates[0])
    lat = float(coordinates[1])

    properties = feature.get("properties", {}) if isinstance(feature, dict) else {}
    resolved_name = properties.get("name") if isinstance(properties, dict) else None
    resolved_state = properties.get("state") if isinstance(properties, dict) else None
    location_label = (
        f"{resolved_name}, {resolved_state}"
        if resolved_name and resolved_state
        else f"{city}, {state}"
    )

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
    if name == HEARTBEAT_TOOL_NAME:
        return {
            "content": [
                {
                    "type": "text",
                    "text": _heartbeat_response(),
                }
            ]
        }

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

        return {
            "content": [
                {
                    "type": "text",
                    "text": forecast_text,
                }
            ]
        }

    raise ValueError(f"Unknown tool: {name}")


def _http_success(payload: dict[str, Any], status_code: int = 200) -> func.HttpResponse:
    return func.HttpResponse(
        json.dumps(payload),
        status_code=status_code,
        mimetype="application/json",
    )


def _http_error(message: str, status_code: int = 400) -> func.HttpResponse:
    return _http_success({"error": message}, status_code=status_code)


@app.route(route="heartbeat", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def heartbeat_http(req: func.HttpRequest) -> func.HttpResponse:
    try:
        result = _run_tool(HEARTBEAT_TOOL_NAME, {})
        return _http_success(result)
    except ValueError as exc:
        return _http_error(str(exc), status_code=400)
    except requests.RequestException as exc:
        return _http_error(f"Upstream request failed: {exc}", status_code=502)
    except Exception as exc:  # noqa: BLE001
        return _http_error(f"Internal error: {exc}", status_code=500)


@app.route(route="weather", methods=["GET"], auth_level=func.AuthLevel.ANONYMOUS)
def weather_http(req: func.HttpRequest) -> func.HttpResponse:
    arguments = {
        "city": req.params.get("city", ""),
        "state": req.params.get("state", ""),
        "days": req.params.get("days", "3"),
    }

    try:
        result = _run_tool(WEATHER_TOOL_NAME, arguments)
        return _http_success(result)
    except ValueError as exc:
        return _http_error(str(exc), status_code=400)
    except requests.RequestException as exc:
        return _http_error(f"Upstream request failed: {exc}", status_code=502)
    except Exception as exc:  # noqa: BLE001
        return _http_error(f"Internal error: {exc}", status_code=500)


@app.route(route="mcp", methods=["POST"], auth_level=func.AuthLevel.ANONYMOUS)
def mcp(req: func.HttpRequest) -> func.HttpResponse:
    request_id: Any = None

    try:
        body = req.get_json()
    except ValueError:
        error = _jsonrpc_error(None, -32700, "Parse error: invalid JSON body.")
        return func.HttpResponse(json.dumps(error), status_code=200, mimetype="application/json")

    if not isinstance(body, dict):
        error = _jsonrpc_error(None, -32600, "Invalid Request: expected a JSON object.")
        return func.HttpResponse(json.dumps(error), status_code=200, mimetype="application/json")

    request_id = body.get("id")
    method = body.get("method")
    params = body.get("params", {})

    if not isinstance(method, str):
        error = _jsonrpc_error(request_id, -32600, "Invalid Request: missing method.")
        return func.HttpResponse(json.dumps(error), status_code=200, mimetype="application/json")

    try:
        if method == "initialize":
            result = {
                "protocolVersion": MCP_PROTOCOL_VERSION,
                "capabilities": {
                    "tools": {},
                },
                "serverInfo": {
                    "name": "weather-mcp-function",
                    "version": "1.0.0",
                },
            }
            response = _jsonrpc_result(request_id, result)

        elif method == "tools/list":
            response = _jsonrpc_result(
                request_id,
                {"tools": [_weather_tool_schema(), _heartbeat_tool_schema()]},
            )

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

        else:
            response = _jsonrpc_error(request_id, -32601, f"Method not found: {method}")

    except ValueError as exc:
        response = _jsonrpc_error(request_id, -32000, str(exc))
    except requests.RequestException as exc:
        response = _jsonrpc_error(request_id, -32001, f"Upstream request failed: {exc}")
    except Exception as exc:  # noqa: BLE001
        response = _jsonrpc_error(request_id, -32603, f"Internal error: {exc}")

    return func.HttpResponse(json.dumps(response), status_code=200, mimetype="application/json")
