# @msgcore/cli

Permission-aware CLI for MsgCore - Universal messaging gateway.

> **Auto-generated from backend contracts** - Do not edit manually

## Installation

```bash
npm install -g @msgcore/cli
```

## Quick Start

### Option 1: Using Config File (Recommended for local development)

```bash
# Configure CLI (stores in ~/.msgcore/config.json with secure permissions)
msgcore config set apiUrl https://api.msgcore.dev
msgcore config set apiKey gk_live_your_api_key_here
msgcore config set defaultProject my-project

# Verify configuration
msgcore config list

# Use CLI
msgcore messages send --target "platform-id:user:123" --text "Hello!"
```

### Option 2: Using Environment Variables (Recommended for CI/CD)

```bash
# Set environment variables (override config file)
export MSGCORE_API_URL="https://api.msgcore.dev"
export MSGCORE_API_KEY="gk_live_your_api_key_here"
export MSGCORE_DEFAULT_PROJECT="my-project"

# Use CLI
msgcore projects list --json
```

### Configuration Priority

1. **Environment variables** (highest priority)
2. **Config file** (~/.msgcore/config.json)
3. **Defaults**

This allows you to:

- Use config file for daily work
- Override with env vars for CI/CD or testing
- Keep sensitive keys secure (file has 600 permissions)

## Features

- ✅ **Permission-aware** - Only shows commands you have access to
- ✅ **Auto-generated** - Always synced with backend API
- ✅ **Type-safe** - Built on @msgcore/sdk with full type safety
- ✅ **Interactive** - Helpful prompts and error messages
- ✅ **JSON output** - Perfect for scripting and automation

## Commands

## ApiKeys

### Generate a new API key
```bash
msgcore keys create --name "Bot Key" --scopes "messages:send,messages:read"
```

### List all API keys for project
```bash
msgcore keys list
```

### Revoke an API key
```bash
msgcore keys revoke --keyId "key-123"
```

## Auth

### Create a new user account (first user becomes admin)
```bash
msgcore auth signup --email admin@example.com --password Admin123 --name "Admin User"
```

### Login with email and password
```bash
msgcore auth login --email admin@example.com --password Admin123
```

### Accept a project invitation and create account
```bash
msgcore auth accept-invite --token abc123... --name "John Doe" --password SecurePass123
```

## Identities

### Create a new identity with platform aliases
```bash
msgcore identities create --displayName "John Doe" --email "john@example.com" --aliases '[{"platformId":"platform-123","providerUserId":"discord-456","providerUserDisplay":"JohnD#1234"}]'
```

### List all identities for a project
```bash
msgcore identities list
```

### Lookup identity by platform user ID
```bash
msgcore identities lookup --platformId platform-123 --providerUserId discord-456
```

## Members

### List all members of a project
```bash
msgcore members list my-project
```

### Add a member to a project
```bash
msgcore members add my-project --email user@example.com --role admin
```

### Update a member role in a project
```bash
msgcore members update my-project user-123 --role admin
```

## Messages

### List received messages for a project
```bash
msgcore messages list
```

### Get message statistics for a project
```bash
msgcore messages stats
```

### List sent messages for a project
```bash
msgcore messages sent
```

## Platform Logs

### List platform processing logs for a project
```bash
msgcore platforms logs list my-project
```

### List logs for a specific platform configuration
```bash
msgcore platforms logs get my-project platform-id-123
```

### Get platform logs statistics and recent errors
```bash
msgcore platforms logs stats my-project
```

## Platforms

### Configure a new platform integration
```bash
msgcore platforms create --platform discord --name "Main Discord Bot" --credentials '{"token":"YOUR_DISCORD_BOT_TOKEN"}'
```

### List configured platforms for project
```bash
msgcore platforms list
```

### Get platform configuration details
```bash
msgcore platforms get --id "platform-123"
```

## Projects

### Create a new project
```bash
msgcore projects create --name "My Project"
```

### List all projects
```bash
msgcore projects list
```

### Get project details
```bash
msgcore projects get my-project
```

## Webhooks

### Create a new webhook for event notifications
```bash
msgcore webhooks create --name "Production Webhook" --url "https://myapp.com/webhooks" --events "message.received,message.sent,message.failed"
```

### List all webhooks for a project
```bash
msgcore webhooks list
```

### Get a specific webhook with delivery statistics
```bash
msgcore webhooks get --webhookId "webhook-123"
```

## Configuration Management

### Config Commands

```bash
# Set configuration values
msgcore config set apiUrl https://api.msgcore.dev
msgcore config set apiKey gk_live_your_api_key_here
msgcore config set defaultProject my-project
msgcore config set outputFormat json

# Get a specific value
msgcore config get apiKey
# Output: apiKey = ***

# List all configuration
msgcore config list
# Output:
#   apiUrl = https://api.msgcore.dev
#   apiKey = ***
#   defaultProject = my-project
```

### Configuration File

Stored in `~/.msgcore/config.json` with **secure permissions (600)**:

```json
{
  "apiUrl": "https://api.msgcore.dev",
  "apiKey": "gk_live_your_api_key_here",
  "defaultProject": "my-project",
  "outputFormat": "table"
}
```

**Security:**

- File permissions: `600` (owner read/write only)
- Directory permissions: `700`
- API keys are never logged or displayed in full
- Safe to use on shared systems

### Environment Variables (Override Config File)

Environment variables have **highest priority**:

```bash
export MSGCORE_API_URL="https://api.msgcore.dev"
export MSGCORE_API_KEY="gk_live_your_api_key_here"
export MSGCORE_JWT_TOKEN="your-jwt-token"  # Alternative to API key
export MSGCORE_DEFAULT_PROJECT="my-project"
export MSGCORE_OUTPUT_FORMAT="json"        # or "table"
```

**Use cases:**

- CI/CD pipelines (GitHub Actions, GitLab CI)
- Docker containers
- Temporary overrides for testing
- Multiple environments

### Configuration Priority

```
┌─────────────────────────────────┐
│ 1. Environment Variables        │ ← Highest priority
├─────────────────────────────────┤
│ 2. Config File (~/.msgcore/)    │
├─────────────────────────────────┤
│ 3. Defaults                     │ ← Lowest priority
└─────────────────────────────────┘
```

## Scripting

The CLI supports `--json` flag for machine-readable output:

```bash
# Get projects as JSON
msgcore projects list --json | jq '.[] | .id'

# Send message and capture result
RESULT=$(msgcore messages send --target "id:user:123" --text "Hello" --json)
echo $RESULT | jq '.jobId'
```

## Links

- [Documentation](https://docs.msgcore.dev)
- [GitHub](https://github.com/filipexyz/msgcore-cli)
- [npm](https://www.npmjs.com/package/@msgcore/cli)
- [Discord Community](https://discord.gg/bQPsvycW)

## License

MIT
