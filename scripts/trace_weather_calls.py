#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


@dataclass
class HttpResult:
    url: str
    method: str
    status_code: int
    request_headers: dict[str, str]
    request_body: Any
    response_json: Any
    response_text: str


def _normalize_base_url(url: str) -> str:
    return url.rstrip("/")


def _decode_json(text: str) -> Any:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None


def _http_call(
    method: str,
    url: str,
    headers: dict[str, str] | None = None,
    json_body: Any | None = None,
    timeout: int = 30,
) -> HttpResult:
    payload_bytes: bytes | None = None
    final_headers = dict(headers or {})

    if json_body is not None:
        payload_bytes = json.dumps(json_body).encode("utf-8")
        final_headers.setdefault("Content-Type", "application/json")

    request = Request(url=url, data=payload_bytes, headers=final_headers, method=method.upper())

    try:
        with urlopen(request, timeout=timeout) as response:
            response_text = response.read().decode("utf-8", errors="replace")
            response_json = _decode_json(response_text)
            return HttpResult(
                url=url,
                method=method.upper(),
                status_code=int(response.status),
                request_headers=final_headers,
                request_body=json_body,
                response_json=response_json,
                response_text=response_text,
            )
    except HTTPError as err:
        response_text = err.read().decode("utf-8", errors="replace")
        response_json = _decode_json(response_text)
        return HttpResult(
            url=url,
            method=method.upper(),
            status_code=int(err.code),
            request_headers=final_headers,
            request_body=json_body,
            response_json=response_json,
            response_text=response_text,
        )
    except URLError as err:
        raise RuntimeError(f"Network error calling {url}: {err}") from err


def _print_json(title: str, payload: Any) -> None:
    print(f"\n=== {title} ===")
    if payload is None:
        print("null")
    else:
        print(json.dumps(payload, indent=2, ensure_ascii=True, sort_keys=True))


def _print_http_result(name: str, result: HttpResult) -> None:
    print(f"\n=== {name} ===")
    print(f"method: {result.method}")
    print(f"url: {result.url}")
    print(f"status: {result.status_code}")
    _print_json(f"{name} request headers", result.request_headers)
    _print_json(f"{name} request body", result.request_body)

    if result.response_json is not None:
        _print_json(f"{name} response json", result.response_json)
    else:
        print(f"\n=== {name} response text ===")
        print(result.response_text)


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Trace weather lookup calls by invoking only Weather WebApp endpoints, mirroring chat bubble behavior."
        )
    )
    parser.add_argument(
        "--weather-webapp-uri",
        required=True,
        help="Base URI for the Weather WebApp, for example https://myapp.azurewebsites.net",
    )
    parser.add_argument("--city", required=True, help="City name")
    parser.add_argument("--state", required=True, help="US state abbreviation")
    parser.add_argument("--days", type=int, default=3, help="Number of forecast periods to request from the webapp (1-7)")
    return parser.parse_args()


def main() -> int:
    args = _parse_args()

    weather_webapp_uri = _normalize_base_url(args.weather_webapp_uri)
    state = args.state.strip().upper()
    city = args.city.strip()

    if args.days < 1 or args.days > 7:
        raise ValueError("--days must be between 1 and 7.")
    if not city:
        raise ValueError("--city is required.")
    if not state:
        raise ValueError("--state is required.")

    weather_webapp_url = f"{weather_webapp_uri}/api/weather?{urlencode({'city': city, 'state': state, 'days': args.days})}"
    weather_webapp_result = _http_call(
        method="GET",
        url=weather_webapp_url,
        headers={"Accept": "application/json"},
    )
    _print_http_result("weather webapp api/weather", weather_webapp_result)
    if weather_webapp_result.status_code != 200:
        return 1

    mcp_url = f"{weather_webapp_uri}/api/mcp"
    mcp_body = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": "get_weather_forecast",
            "arguments": {
                "city": city,
                "state": state,
                "days": args.days,
            },
        },
    }
    mcp_result = _http_call(
        method="POST",
        url=mcp_url,
        headers={"Accept": "application/json"},
        json_body=mcp_body,
    )
    _print_http_result("weather webapp api/mcp", mcp_result)
    if mcp_result.status_code != 200:
        return 1

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001
        print(f"Error: {exc}", file=sys.stderr)
        raise SystemExit(1)