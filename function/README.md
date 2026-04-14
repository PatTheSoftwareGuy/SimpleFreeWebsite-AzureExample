# Weather MCP Flask Web App (Python 3.13)

This Flask web API exposes an MCP-compatible HTTP endpoint that serves one tool:

- `get_weather_forecast`

It is designed for city/state weather lookups.

## Endpoint

- `POST /api/mcp`

## Tool

- Name: `get_weather_forecast`
- Arguments:
  - `city` (string, required)
  - `state` (string, required, e.g. `WA`)
  - `days` (integer, optional, default `3`, range `1-7`)

## Environment Variables

- `NOMINATIM_BASE_URL` (optional): defaults to `https://nominatim.openstreetmap.org/search`
- `NOMINATIM_USER_AGENT` (optional but recommended): user agent for Nominatim calls
- `NWS_USER_AGENT` (optional but recommended): user agent for weather.gov requests

## Local Run

From the repo root, use the local webapp runner script:

```bash
./scripts/run_weather_webapp_local.sh .azure/bubble-chat/.env
```

Default local endpoint:

- `http://localhost:7071`

## MCP Request Examples

### List tools

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list",
  "params": {}
}
```

### Call tool

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_weather_forecast",
    "arguments": {
      "city": "Seattle",
      "state": "WA",
      "days": 3
    }
  }
}
```

## Prompty Integration (MCP Tool)

Example `.prompty` frontmatter snippet:

```yaml
tools:
  - name: weather
    kind: mcp
    serverName: weather-mcp
    connection:
      kind: reference
      name: weather-mcp-connection
    approvalMode:
      kind: never
    allowedTools:
      - get_weather_forecast
```

Configure your Prompty runtime connection so `weather-mcp-connection` points to this web app endpoint.
