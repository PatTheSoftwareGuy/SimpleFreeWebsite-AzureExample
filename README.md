# simple-chat-bubble

A production-ready chat bubble widget with:

- React + TypeScript frontend widget (Fluent UI v9)
- Python 3.13 FastAPI backend
- Prompty-based agent definition (`Agent Plane Talk`)
- AI Horde (`oai.aihorde.net`) OpenAI-compatible backend
- Azure App Service deployment via `azd` + Bicep
- GitHub Actions CI/CD for quality checks and deployment

## Architecture

- `frontend/`: Embeddable widget bundle (`chat-bubble.iife.js`) and CSS.
- `backend/`: FastAPI API (`/api/chat`) + static hosting for test page.
- `backend/prompts/agent-plane-talk.prompty`: Default humorous aviation assistant profile.
- `infra/`: Azure Bicep for App Service Plan + App Service.
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

### 2. Build widget assets

```bash
./scripts/build_frontend.sh
```

### 3. Run backend

```bash
cd backend
python3 -m pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open:

- `http://localhost:8000/static/test-host.html`

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

The backend reads this file and injects it as the system prompt for every chat completion.

## Azure Deployment (azd + Bicep)

Prerequisites:

- `az login`
- `azd auth login`

Set required azd environment values:

```bash
azd env new production
azd env set AZURE_LOCATION eastus
azd env set AIHORDE_API_KEY "your_ai_horde_key"
azd env set LATLNG_API_KEY "your_latlng_server_key"
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

This allows `azure/login` to use workload identity federation against the managed identity, avoiding a separate service principal/app registration for CI/CD.

## Important Azure Note

This template defaults to App Service Plan `F1` and Python `3.13`. If you need a paid plan, set `APP_SERVICE_SKU_NAME` to `B3` and re-run `azd provision`.
