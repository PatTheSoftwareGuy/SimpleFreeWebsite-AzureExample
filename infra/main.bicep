targetScope = 'resourceGroup'

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('App Service app name. Must be globally unique.')
param appName string = 'chatbubble-${uniqueString(resourceGroup().id)}'

@description('Weather MCP Web App name. Must be globally unique.')
param weatherWebAppName string = '${appName}-func'

@description('App Service plan name.')
param appServicePlanName string = '${appName}-plan'

@description('Weather MCP Web App Service plan name used when SKU is F1.')
param weatherWebAppServicePlanName string = '${weatherWebAppName}-plan'

@description('App Service plan SKU. Allowed values: F1 (Free) or B1/B3 (Basic).')
@allowed([
  'F1'
  'B1'
  'B3'
])
param appServiceSkuName string 

@description('User Assigned Managed Identity name for GitHub Actions deployments.')
param githubDeployIdentityName string = '${appName}-gha-mi'

@description('GitHub organization or user name that owns the repository.')
param githubOrg string = ''

@description('GitHub repository name for workload identity federation.')
param githubRepo string = ''

@description('GitHub branch allowed to request OIDC tokens for deployment.')
param githubBranch string = 'main'

@description('AI Horde API key passed to the app as an environment variable.')
@secure()
param aiHordeApiKey string

@description('AI Horde model identifier used by the chat backend.')
param aiHordeModel string = 'koboldcpp/LFM2.5-1.2B-Instruct'

@description('Nominatim base URL used by the Weather MCP Web App for forward geocoding requests.')
param nominatimBaseUrl string = 'https://nominatim.openstreetmap.org/search'

@description('User-Agent header used when calling Nominatim.')
param nominatimUserAgent string = 'simple-chat-bubble-weather-mcp/1.0'

@description('User-Agent header used when calling weather.gov.')
param nwsUserAgent string = 'simple-chat-bubble-weather-mcp/1.0 (contact: admin@example.com)'

var enableGithubFederation = !empty(githubOrg) && !empty(githubRepo)
var isFreeSku = appServiceSkuName == 'F1'
var appServiceSkuTier = appServiceSkuName == 'F1' ? 'Free' : 'Basic'
var webAppUrl = 'https://${appName}.azurewebsites.net'
var weatherWebAppUrl = 'https://${weatherWebAppName}.azurewebsites.net/'

resource appServicePlan 'Microsoft.Web/serverfarms@2024-04-01' = {
  name: appServicePlanName
  location: location
  kind: 'linux'
  sku: {
    name: appServiceSkuName
    tier: appServiceSkuTier
    size: appServiceSkuName
    capacity: 1
  }
  properties: {
    reserved: true
  }
}

resource weatherWebAppServicePlan 'Microsoft.Web/serverfarms@2024-04-01' = if (isFreeSku) {
  name: weatherWebAppServicePlanName
  location: location
  kind: 'linux'
  sku: {
    name: appServiceSkuName
    tier: appServiceSkuTier
    size: appServiceSkuName
    capacity: 1
  }
  properties: {
    reserved: true
  }
}

resource githubDeployIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: githubDeployIdentityName
  location: location
}

resource githubOidcFederatedCredential 'Microsoft.ManagedIdentity/userAssignedIdentities/federatedIdentityCredentials@2023-01-31' = if (enableGithubFederation) {
  parent: githubDeployIdentity
  name: 'github-main'
  properties: {
    issuer: 'https://token.actions.githubusercontent.com'
    audiences: [
      'api://AzureADTokenExchange'
    ]
    subject: 'repo:${githubOrg}/${githubRepo}:ref:refs/heads/${githubBranch}'
  }
}

resource webApp 'Microsoft.Web/sites@2024-04-01' = {
  name: appName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'PYTHON|3.13'
      alwaysOn: false
      appCommandLine: 'gunicorn --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000 app.main:app'
      appSettings: [
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
        {
          name: 'WEBSITES_PORT'
          value: '8000'
        }
        {
          name: 'AIHORDE_API_KEY'
          value: aiHordeApiKey
        }
        {
          name: 'AIHORDE_BASE_URL'
          value: 'https://oai.aihorde.net/v1'
        }
        {
          name: 'AIHORDE_MODEL'
          value: aiHordeModel
        }
        {
          name: 'AZURE_WEATHER_WEBAPP_URL'
          value: weatherWebAppUrl
        }
      ]
    }
    httpsOnly: true
  }
}

resource weatherWebApp 'Microsoft.Web/sites@2024-04-01' = {
  name: weatherWebAppName
  location: location
  kind: 'app,linux'
  properties: {
    serverFarmId: isFreeSku ? weatherWebAppServicePlan.id : appServicePlan.id
    siteConfig: {
      linuxFxVersion: 'PYTHON|3.13'
      alwaysOn: false
      appCommandLine: 'gunicorn --bind=0.0.0.0:8000 function_app:app'
      cors: {
        allowedOrigins: [
          webAppUrl
          'https://portal.azure.com'
        ]
      }
      appSettings: [
        {
          name: 'SCM_DO_BUILD_DURING_DEPLOYMENT'
          value: 'true'
        }
        {
          name: 'WEBSITES_PORT'
          value: '8000'
        }
        {
          name: 'NOMINATIM_BASE_URL'
          value: nominatimBaseUrl
        }
        {
          name: 'NOMINATIM_USER_AGENT'
          value: nominatimUserAgent
        }
        {
          name: 'NWS_USER_AGENT'
          value: nwsUserAgent
        }
      ]
    }
    httpsOnly: true
  }
}

output AZURE_WEBAPP_NAME string = webApp.name
output AZURE_WEBAPP_URL string = 'https://${webApp.properties.defaultHostName}'
output AZURE_WEATHER_WEBAPP_NAME string = weatherWebApp.name
output AZURE_WEATHER_WEBAPP_URL string = 'https://${weatherWebApp.properties.defaultHostName}'
output AIHORDE_MODEL string = aiHordeModel
output GITHUB_DEPLOY_MANAGED_IDENTITY_CLIENT_ID string = githubDeployIdentity.properties.clientId
output GITHUB_DEPLOY_MANAGED_IDENTITY_PRINCIPAL_ID string = githubDeployIdentity.properties.principalId
output GITHUB_DEPLOY_MANAGED_IDENTITY_RESOURCE_ID string = githubDeployIdentity.id
output APP_SERVICE_SKU_NAME string = appServiceSkuName
