# Weather MCP Function App (Python 3.13)

This Azure Function App exposes an MCP-compatible HTTP endpoint that serves one tool:

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

- `LATLNG_API_KEY` (required): server key for https://api.latlng.work
- `LATLNG_BASE_URL` (optional): defaults to `https://api.latlng.work/api`
- `NWS_USER_AGENT` (optional but recommended): user agent for weather.gov requests

## Local Run

1. Install dependencies:

   ```bash
   python3.13 -m pip install -r requirements.txt
   ```

2. Copy settings:

   ```bash
   cp local.settings.sample.json local.settings.json
   ```

3. Set `LATLNG_API_KEY` in `local.settings.json`.
4. Start Functions host:

   ```bash
   func start
   ```

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

Configure your Prompty runtime connection so `weather-mcp-connection` points to this function endpoint.
