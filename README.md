# simple-chat-bubble

A production-ready chat bubble widget with:

- React + TypeScript frontend widget (Fluent UI v9)
- Python 3.13 FastAPI backend
- Python 3.13 Flask Weather MCP web app
- Prompty-based agent definition (`Agent Plane Talk`)
- AI Horde (`oai.aihorde.net`) OpenAI-compatible backend
- Azure App Service deployment via `azd` + Bicep (chat app + weather web app)
- GitHub Actions CI/CD for quality checks and deployment

## Architecture

- `frontend/`: Embeddable widget bundle (`chat-bubble.iife.js`) and CSS.
- `backend/`: FastAPI API (`/api/chat`, `/api/chat/stream`) + static hosting for test page.
- `function/`: Flask Weather MCP API (`/api/mcp`, `/api/weather`, `/api/heartbeat`).
- `backend/prompts/agent-plane-talk.prompty`: Default humorous aviation assistant profile.
- `infra/`: Azure Bicep for App Service Plans, chat web app, and weather web app.
- `azure.yaml`: Azure Developer CLI project definition.

## Local Development

### 1. Configure environment

Set the API key in your shell:

```bash
export AIHORDE_API_KEY="your_ai_horde_key"
```

Optional settings:

```bash
export AIHORDE_BASE_URL="https://oai.aihorde.net/v1"
export AIHORDE_MODEL="openai/gpt-oss-20b"
```

Weather MCP defaults (optional for local/dev):

```bash
export AZURE_WEATHER_WEBAPP_URL="http://localhost:7071"
export NOMINATIM_BASE_URL="https://nominatim.openstreetmap.org/search"
export NOMINATIM_USER_AGENT="simple-chat-bubble-weather-mcp/1.0"
export NWS_USER_AGENT="simple-chat-bubble-weather-mcp/1.0 (contact: admin@example.com)"
```

To control client-side history window (how many most recent bubble messages are sent on each request), set:

```bash
export VITE_CHAT_HISTORY_LIMIT="10"
```

If omitted or invalid, the widget defaults to `10`.

### 2. Build widget assets (optional)

```bash
./scripts/build_frontend.sh
```

You can skip this step when using `./scripts/run_ui_local.sh`, which builds/copies assets automatically.

### 3. Run chat backend (FastAPI)

```bash
./scripts/run_ui_local.sh
```

Open:

- `http://localhost:8000/static/test-host.html`

### 4. Run weather web app (Flask MCP)

```bash
./scripts/run_weather_webapp_local.sh
```

Local endpoint:

- `http://localhost:7071`

## Embedding the Bubble on Any HTML Page

Include the generated assets and mount:

```html
<link rel="stylesheet" href="/static/chat-bubble.css" />
<script src="/static/chat-bubble.iife.js"></script>
<script>
	window.SimpleChatBubble.mount({
		apiBaseUrl: "https://your-backend-hostname",
		title: "Agent Plane Talk"
	});
</script>
```

## Prompty Agent

The agent is defined in:

- `backend/prompts/agent-plane-talk.prompty`

The backend reads this file and injects it as the system prompt for every chat completion. It also registers local function tools and MCP tools declared in the Prompty frontmatter.

## Testing Weather Flow With trace_weather_calls.py

Use `scripts/trace_weather_calls.py` to validate the weather path used by the chat flow. The script verifies both weather web app endpoints (`/api/weather` and `/api/mcp`) and returns non-zero on failure.

Run against a deployed weather web app:

```bash
python3 ./scripts/trace_weather_calls.py \
	--weather-webapp-uri "https://your-weather-webapp.azurewebsites.net" \
	--city "Chicago" \
	--state "IL" \
	--days 3
```

Run against local weather web app (from Local Development step 4):

```bash
python3 ./scripts/trace_weather_calls.py \
	--weather-webapp-uri "http://localhost:7071" \
	--city "Seattle" \
	--state "WA" \
	--days 3
```

Expected: exit code `0` and HTTP `200` for both calls. On failure, the script exits with code `1` and prints request/response details.

## Azure Deployment (azd + Bicep)

Prerequisites:

- `az login`
- `azd auth login`

Set required azd environment values:

```bash
azd env new production
azd env set AZURE_LOCATION eastus
azd env set AIHORDE_API_KEY "your_ai_horde_key"
azd env set APP_SERVICE_SKU_NAME "F1"
```

`AIHORDE_MODEL` is initialized by the first `azd provision` via Bicep output, with default:

- `koboldcpp/LFM2.5-1.2B-Instruct`

To override it manually:

```bash
azd env set AIHORDE_MODEL "your-preferred-model"
azd provision
```

`APP_SERVICE_SKU_NAME` supports:

- `F1` (Free)
- `B1` (Basic)
- `B3` (Basic)

Example to switch to Basic B3:

```bash
azd env set APP_SERVICE_SKU_NAME "B3"
azd provision
```

Preview and deploy:

```bash
azd provision --preview
azd provision
azd deploy
```

The App Service startup command is configured for ASGI/FastAPI:

```text
gunicorn --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000 app.main:app
```

The weather web app (MCP) startup command is:

```text
gunicorn --bind=0.0.0.0:8000 function_app:app
```

## CI/CD

Workflow file:

- `.github/workflows/production-cicd.yml`

The production workflow is intentionally disabled by default. To enable it, set GitHub repository or environment variable `ENABLE_PRODUCTION_CICD` to `true`.

Required GitHub Secrets:
- `AIHORDE_API_KEY`

Optional GitHub Variables:

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`
- `AZURE_LOCATION` (defaults to `eastus` in workflow)

### GitHub OIDC with User Assigned Managed Identity (no app registration)

The Bicep template now creates a deployment User Assigned Managed Identity and, when configured, a GitHub OIDC federated credential.

Set these azd environment values before provisioning so the federated credential can be created with your repository details:

```bash
azd env config set infra.parameters.githubOrg "<your-github-org-or-user>"
azd env config set infra.parameters.githubRepo "<your-repo-name>"
azd env config set infra.parameters.githubBranch "main"
```

Provision once (or re-provision) to create the identity and federated credential:

```bash
azd provision
```

Grant the managed identity deployment permissions once (run as an owner/admin):

```bash
RG_ID=$(az group show -n "$(azd env get-value AZURE_RESOURCE_GROUP)" --query id -o tsv)
MI_PRINCIPAL_ID=$(azd env get-value GITHUB_DEPLOY_MANAGED_IDENTITY_PRINCIPAL_ID)
az role assignment create --assignee-object-id "$MI_PRINCIPAL_ID" --assignee-principal-type ServicePrincipal --role Contributor --scope "$RG_ID"
```

Get identity outputs:

```bash
azd env get-values | grep GITHUB_DEPLOY_MANAGED_IDENTITY
```

Add these as repository or environment variables in GitHub Actions:

- `AZURE_CLIENT_ID` = `GITHUB_DEPLOY_MANAGED_IDENTITY_CLIENT_ID`
- `AZURE_TENANT_ID` = your Azure tenant ID
- `AZURE_SUBSCRIPTION_ID` = your Azure subscription ID

If you want to override the model in CI/CD, optionally set:

- `AIHORDE_MODEL`

This allows `azure/login` to use workload identity federation against the managed identity, avoiding a separate service principal/app registration for CI/CD.

## Important Azure Note

This template defaults to App Service Plan `F1` and Python `3.13`. If you need a paid plan, set `APP_SERVICE_SKU_NAME` to `B1` or `B3` and re-run `azd provision`.

## Environment Variables Reference

The table below lists environment variables used by this repo, whether they are required, and what they control.

### Runtime (chat backend and weather web app)

| Variable | Required | Default | Used by | Purpose |
|---|---|---|---|---|
| `AIHORDE_API_KEY` | Yes (chat requests) | None | backend | API key for AI Horde/OpenAI-compatible chat completions. |
| `AIHORDE_BASE_URL` | No | `https://oai.aihorde.net/v1` | backend | Base URL for OpenAI-compatible chat API endpoint. |
| `AIHORDE_FALLBACK_MODEL` | No | unset | backend | Preferred fallback model when the requested model is unavailable (HTTP 406). |
| `AIHORDE_HTTP_TIMEOUT_SECONDS` | No | `60` | backend | Timeout for direct AI Horde HTTP calls. |
| `AIHORDE_MODEL` | No | Prompty/Bicep default (for example `koboldcpp/Ministral-3-8B-Instruct-2512`) | backend | Model identifier sent to chat completions. |
| `AZURE_WEATHER_WEBAPP_URL` | No | `http://localhost:7071` (Prompty default) | backend Prompty MCP config | Base URL for the weather MCP server (`/api/mcp` is appended in Prompty). |
| `DISABLE_MODEL_TOOL_CALLING` | No | unset (`false`) | backend | Disables model-native tool calling when set to truthy (`1`, `true`, `yes`, `on`). |
| `MCP_HTTP_TIMEOUT_SECONDS` | No | `20` | backend | Timeout for MCP JSON-RPC HTTP calls (`tools/list`, `tools/call`). |
| `NOMINATIM_BASE_URL` | No | `https://nominatim.openstreetmap.org/search` | function | Geocoding endpoint used to resolve city/state to coordinates. |
| `NOMINATIM_USER_AGENT` | No | Falls back to `NWS_USER_AGENT`, then built-in default | function | User-Agent header for Nominatim requests. |
| `NWS_USER_AGENT` | No (recommended) | `simple-chat-bubble-weather-mcp/1.0 (contact: admin@example.com)` | function | User-Agent header for weather.gov requests. |
| `PROMPTY_PATH` | No | `backend/prompts/agent-plane-talk.prompty` | backend | Override path to the `.prompty` file loaded at startup. |
| `VITE_CHAT_HISTORY_LIMIT` | No | `10` | frontend | Number of most recent messages sent with each chat request. |

### Local Dev Script Controls

| Variable | Required | Default | Used by | Purpose |
|---|---|---|---|---|
| `AZURE_ENV_NAME` | No | unset | `scripts/load_azd_env.sh`, CI workflow | Selects `.azure/<AZURE_ENV_NAME>/.env` when loading azd env values. |
| `CHAT_BUBBLE_FAST_BUILD` | No | `1` (set by `run_ui_local.sh`) | Vite build config | Enables fast/minified-off widget build path for local runs. |
| `CI` | No | unset | `scripts/build_frontend.sh` | When `true`, use `npm ci` instead of `npm install`. |
| `SKIP_FRONTEND_INSTALL` | No | `0` | `scripts/build_frontend.sh` | Skip `npm` install step when set to `1`. |
| `UI_PORT` | No | `8000` | `scripts/run_ui_local.sh` | Port for local FastAPI UI/chat backend. |
| `UI_SKIP_FRONTEND_BUILD` | No | `0` | `scripts/run_ui_local.sh` | Skip frontend build/copy when set to `1`. |
| `WEATHER_WEBAPP_PORT` | No | `7071` | `scripts/run_weather_webapp_local.sh` | Port for local weather web app. |

### azd / Infrastructure Inputs

These are set in azd env and consumed during provisioning/deploy.

| Variable | Required | Default | Used by | Purpose |
|---|---|---|---|---|
| `AIHORDE_API_KEY` | Yes | None | `infra/main.parameters.json`, CI | Injected into chat web app settings for runtime model access. |
| `AIHORDE_MODEL` | No | `koboldcpp/Ministral-3-8B-Instruct-2512` | Bicep output/app setting, CI | Model name provisioned into app settings. |
| `APP_SERVICE_SKU_NAME` | Yes | None | `infra/main.parameters.json` | App Service plan SKU (`F1`, `B1`, `B3`). |
| `AZURE_LOCATION` | Yes | None | `infra/main.parameters.json`, CI | Azure region for resources (for example `eastus`). |

### GitHub Actions (Production CI/CD)

| Variable/Secret | Required | Default | Used by | Purpose |
|---|---|---|---|---|
| `AIHORDE_API_KEY` (secret) | Yes (for deploy) | None | azd env setup in CI | Secret API key passed into azd env before provision/deploy. |
| `AIHORDE_MODEL` (variable) | No | `koboldcpp/Ministral-3-8B-Instruct-2512` in workflow | azd env setup in CI | Optional model override in CI. |
| `AZURE_CLIENT_ID` (variable) | Yes (for deploy) | None | `azure/login` | OIDC client ID for Azure login. |
| `AZURE_LOCATION` (variable) | No | `eastus` in workflow | azd env setup in CI | Region used when CI initializes azd env values. |
| `AZURE_SUBSCRIPTION_ID` (variable) | Yes (for deploy) | None | `azure/login` | Azure subscription ID for deployment scope. |
| `AZURE_TENANT_ID` (variable) | Yes (for deploy) | None | `azure/login` | Azure tenant ID for OIDC login. |
| `ENABLE_PRODUCTION_CICD` (variable) | No | `false` behavior when unset | workflow job conditions | Enables quality/deploy jobs when set to `true`. |
