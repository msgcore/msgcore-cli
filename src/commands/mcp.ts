// MCP Server command for MsgCore CLI
// Implements native stdio-based MCP server for Claude Desktop integration
// AUTO-GENERATED - Uses embedded SDK contracts to build MCP tools

import { Command } from 'commander';
import * as readline from 'readline';
import axios, { AxiosInstance } from 'axios';
import { loadConfig } from '../lib/utils';

const CONTRACTS = [
  {
    "controller": "WebhooksController",
    "method": "createWebhook",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/webhooks",
    "contractMetadata": {
      "command": "webhooks create",
      "description": "Create a new webhook for event notifications",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:write"
      ],
      "inputType": "CreateWebhookDto",
      "outputType": "WebhookResponse",
      "options": {
        "name": {
          "required": true,
          "description": "Friendly name for the webhook",
          "type": "string"
        },
        "url": {
          "required": true,
          "description": "Target URL for webhook delivery",
          "type": "string"
        },
        "events": {
          "required": true,
          "description": "Events to subscribe to (comma-separated: message.received,message.sent,message.failed,button.clicked,reaction.added,reaction.removed)",
          "type": "array"
        },
        "secret": {
          "description": "Custom webhook secret (auto-generated if not provided)",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Create webhook for all message events",
          "command": "msgcore webhooks create --name \"Production Webhook\" --url \"https://myapp.com/webhooks\" --events \"message.received,message.sent,message.failed\""
        },
        {
          "description": "Create webhook for reactions",
          "command": "msgcore webhooks create --name \"Reactions Webhook\" --url \"https://myapp.com/webhooks\" --events \"reaction.added,reaction.removed\""
        },
        {
          "description": "Create webhook for all events",
          "command": "msgcore webhooks create --name \"All Events\" --url \"https://myapp.com/webhooks\" --events \"message.received,message.sent,message.failed,button.clicked,reaction.added,reaction.removed\""
        }
      ]
    },
    "typeDefinitions": {
      "AcceptInviteDto": "export interface AcceptInviteDto {\n  token: string;\n  name: string;\n  password: string;\n}",
      "AddAliasDto": "export interface AddAliasDto {\n  platformId: string;\n  providerUserId: string;\n  providerUserDisplay?: string;\n}",
      "AddMemberDto": "export interface AddMemberDto {\n  email: string;\n  role: ProjectRole;\n}",
      "ApiKeyListResponse": "export interface ApiKeyListResponse {\n  id: string;\n  name: string;\n  maskedKey: string;\n  scopes: string[];\n  lastUsedAt: Date | null;\n  expiresAt: Date | null;\n  createdAt: Date;\n}",
      "ApiKeyResponse": "export interface ApiKeyResponse {\n  id: string;\n  key: string;\n  name: string;\n  prefix: string;\n  scopes: string[];\n  expiresAt: Date | null;\n  createdAt: Date;\n}",
      "ApiKeyRollResponse": "export interface ApiKeyRollResponse {\n  id: string;\n  key: string;\n  name: string;\n  prefix: string;\n  scopes: string[];\n  expiresAt: Date | null;\n  createdAt: Date;\n  oldKeyRevokedAt: Date;\n}",
      "AttachmentDto": "export interface AttachmentDto {\n  url?: string;\n  data?: string;\n  filename?: string;\n  mimeType?: string;\n  caption?: string;\n}",
      "AuthResponse": "export interface AuthResponse {\n  accessToken: string;\n  user: {\n    id: string;\n    email: string;\n    name?: string;\n    isAdmin: boolean;\n  };\n}",
      "ButtonDto": "export interface ButtonDto {\n  text: string;\n  value?: string;\n  url?: string;\n  style?: ButtonStyle;\n}",
      "ButtonStyle": "export type ButtonStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'link';",
      "ContentDto": "export interface ContentDto {\n  subject?: string;\n  text?: string;\n  markdown?: string;\n  html?: string;\n  attachments?: AttachmentDto[];\n  buttons?: ButtonDto[];\n  embeds?: EmbedDto[];\n  platformOptions?: Record<string, any>;\n}",
      "CreateApiKeyDto": "export interface CreateApiKeyDto {\n  name: string;\n  scopes: string[];\n  expiresInDays?: number;\n}",
      "CreateIdentityDto": "export interface CreateIdentityDto {\n  displayName?: string;\n  email?: string;\n  metadata?: Record<string, any>;\n  aliases: IdentityAliasDto[];\n}",
      "CreateInviteDto": "export interface CreateInviteDto {\n  email: string;\n}",
      "CreatePlatformDto": "export interface CreatePlatformDto {\n  platform: PlatformType;\n  name: string;\n  description?: string;\n  credentials: Record<string, any>;\n  isActive?: boolean;\n  testMode?: boolean;\n}",
      "CreateProjectDto": "export interface CreateProjectDto {\n  name: string;\n  description?: string;\n  id?: string;\n  environment?: ProjectEnvironment;\n  isDefault?: boolean;\n  settings?: any;\n}",
      "CreateWebhookDto": "export interface CreateWebhookDto {\n  name: string;\n  url: string;\n  events: WebhookEventType[];\n  secret?: string;\n}",
      "EmbedAuthorDto": "export interface EmbedAuthorDto {\n  name: string;\n  url?: string;\n  iconUrl?: string;\n}",
      "EmbedDto": "export interface EmbedDto {\n  title?: string;\n  description?: string;\n  color?: string;\n  url?: string;\n  imageUrl?: string;\n  thumbnailUrl?: string;\n  author?: EmbedAuthorDto;\n  footer?: EmbedFooterDto;\n  timestamp?: string;\n  fields?: EmbedFieldDto[];\n}",
      "EmbedFieldDto": "export interface EmbedFieldDto {\n  name: string;\n  value: string;\n  inline?: boolean;\n}",
      "EmbedFooterDto": "export interface EmbedFooterDto {\n  text: string;\n  iconUrl?: string;\n}",
      "IdentityAliasDto": "export interface IdentityAliasDto {\n  platformId: string;\n  providerUserId: string;\n  providerUserDisplay?: string;\n}",
      "IdentityAliasResponse": "export interface IdentityAliasResponse {\n  id: string;\n  identityId: string;\n  projectId: string;\n  platformId: string;\n  platform: string;\n  providerUserId: string;\n  providerUserDisplay: string | null;\n  linkedAt: Date;\n  linkMethod: 'manual' | 'automatic';\n}",
      "IdentityResponse": "export interface IdentityResponse {\n  id: string;\n  projectId: string;\n  displayName: string | null;\n  email: string | null;\n  metadata: Record<string, any> | null;\n  createdAt: Date;\n  updatedAt: Date;\n  aliases: IdentityAliasResponse[];\n}",
      "InviteResponse": "export interface InviteResponse {\n  inviteLink: string;\n  email: string;\n  expiresAt: Date;\n}",
      "LoginDto": "export interface LoginDto {\n  email: string;\n  password: string;\n}",
      "MessageListResponse": "export interface MessageListResponse {\n  messages: ReceivedMessageResponse[];\n  pagination: {\n    total: number;\n    limit: number;\n    offset: number;\n    hasMore: boolean;\n  };\n}",
      "MessageResponse": "export interface MessageResponse {\n  message: string;\n}",
      "MessageRetryResponse": "export interface MessageRetryResponse {\n  success: boolean;\n  jobId: string;\n  message: string;\n}",
      "MessageSendResponse": "export interface MessageSendResponse {\n  success: boolean;\n  jobId: string;\n  status: string;\n  targets: Array<{\n    platformId: string;\n    type: string;\n    id: string;\n  }>;\n  platformIds: string[];\n  timestamp: string;\n  message: string;\n}",
      "MessageStatsResponse": "export interface MessageStatsResponse {\n  received: {\n    totalMessages: number;\n    recentMessages: number;\n    uniqueUsers: number;\n    uniqueChats: number;\n    byPlatform: Array<{\n      platform: string;\n      count: number;\n    }>;\n  };\n  sent: {\n    totalMessages: number;\n    byPlatformAndStatus: Array<{\n      platform: string;\n      status: string;\n      count: number;\n    }>;\n  };\n}",
      "MessageStatusResponse": "export interface MessageStatusResponse {\n  jobId: string;\n  status: string;\n  progress?: number;\n  result?: any;\n  error?: string;\n  createdAt: Date;\n  updatedAt?: Date;\n}",
      "MetadataDto": "export interface MetadataDto {\n  trackingId?: string;\n  tags?: string[];\n  priority?: Priority;\n}",
      "OptionsDto": "export interface OptionsDto {\n  replyTo?: string;\n  silent?: boolean;\n  scheduled?: string;\n}",
      "PermissionResponse": "export interface PermissionResponse {\n  authType: 'api-key' | 'jwt';\n  permissions: string[];\n  project?: {\n    id: string;\n    name: string;\n  };\n  user?: {\n    userId: string;\n    email?: string;\n    name?: string;\n  };\n  apiKey?: {\n    id: string;\n    name: string;\n  };\n}",
      "PlatformLogResponse": "export interface PlatformLogResponse {\n  id: string;\n  projectId: string;\n  platformId?: string;\n  platform: string;\n  level: 'info' | 'warn' | 'error' | 'debug';\n  category: 'connection' | 'webhook' | 'message' | 'error' | 'auth' | 'general';\n  message: string;\n  metadata?: Record<string, any>;\n  error?: string;\n  timestamp: string;\n  platformConfig?: {\n    id: string;\n    platform: string;\n    isActive: boolean;\n  };\n}",
      "PlatformLogsResponse": "export interface PlatformLogsResponse {\n  logs: PlatformLogResponse[];\n  pagination: {\n    total: number;\n    limit: number;\n    offset: number;\n    hasMore: boolean;\n  };\n}",
      "PlatformLogStatsResponse": "export interface PlatformLogStatsResponse {\n  summary: Array<{\n    level: string;\n    category: string;\n    count: number;\n  }>;\n  recentErrors: Array<{\n    message: string;\n    category: string;\n    timestamp: string;\n    platform: string;\n  }>;\n}",
      "PlatformResponse": "export interface PlatformResponse {\n  id: string;\n  platform: string;\n  isActive: boolean;\n  testMode: boolean;\n  webhookUrl: string;\n  createdAt: Date;\n  updatedAt: Date;\n}",
      "PlatformType": "export type PlatformType = 'discord' | 'telegram' | 'whatsapp-evo' | 'email';",
      "Priority": "export type Priority = 'low' | 'normal' | 'high';",
      "ProjectEnvironment": "export type ProjectEnvironment = 'development' | 'staging' | 'production';",
      "ProjectMemberResponse": "export interface ProjectMemberResponse {\n  id: string;\n  projectId: string;\n  userId: string;\n  role: ProjectRole;\n  createdAt: string;\n  updatedAt: string;\n  user: {\n    id: string;\n    email: string;\n    name?: string;\n  };\n}",
      "ProjectResponse": "export interface ProjectResponse {\n  id: string;\n  name: string;\n  description?: string;\n  environment: 'development' | 'staging' | 'production';\n  isDefault: boolean;\n  settings?: Record<string, unknown>;\n  createdAt: string;\n  updatedAt: string;\n  _count?: {\n    apiKeys: number;\n  };\n}",
      "ProjectRole": "export type ProjectRole = 'owner' | 'admin' | 'member' | 'viewer';",
      "QueryMessagesDto": "export interface QueryMessagesDto {\n  platform?: string;\n  platformId?: string;\n  chatId?: string;\n  userId?: string;\n  startDate?: string;\n  endDate?: string;\n  limit?: number;\n  offset?: number;\n  order?: 'asc' | 'desc';\n  raw?: boolean;\n  reactions?: boolean;\n}",
      "ReceivedMessageResponse": "export interface ReceivedMessageResponse {\n  id: string;\n  platform: string;\n  providerMessageId: string;\n  providerChatId: string;\n  providerUserId: string;\n  userDisplay: string | null;\n  messageText: string | null;\n  messageType: string;\n  receivedAt: Date;\n  rawData: any;\n  platformConfig?: {\n    id: string;\n    platform: string;\n    isActive: boolean;\n    testMode: boolean;\n  };\n}",
      "ReceivedReactionResponse": "export interface ReceivedReactionResponse {\n  id: string;\n  projectId: string;\n  platformId: string;\n  platform: string;\n  providerMessageId: string;\n  providerChatId: string;\n  providerUserId: string;\n  userDisplay: string | null;\n  emoji: string;\n  reactionType: 'added' | 'removed';\n  rawData: Record<string, any>;\n  receivedAt: Date;\n}",
      "SendMessageDto": "export interface SendMessageDto {\n  targets: TargetDto[];\n  content: ContentDto;\n  options?: OptionsDto;\n  metadata?: MetadataDto;\n}",
      "SendReactionDto": "export interface SendReactionDto {\n  platformId: string;\n  messageId: string;\n  emoji: string;\n}",
      "SentMessageListResponse": "export interface SentMessageListResponse {\n  messages: SentMessageResponse[];\n  pagination: {\n    total: number;\n    limit: number;\n    offset: number;\n    hasMore: boolean;\n  };\n}",
      "SentMessageResponse": "export interface SentMessageResponse {\n  id: string;\n  platform: string;\n  jobId: string | null;\n  providerMessageId: string | null;\n  targetChatId: string;\n  targetUserId: string | null;\n  targetType: string;\n  messageText: string | null;\n  messageContent: Record<string, unknown> | null;\n  status: string;\n  errorMessage: string | null;\n  sentAt: Date | null;\n  createdAt: Date;\n}",
      "SignupDto": "export interface SignupDto {\n  email: string;\n  password: string;\n  name?: string;\n}",
      "SupportedPlatformsResponse": "export interface SupportedPlatformsResponse {\n  platforms: Array<{\n    name: string;\n    displayName: string;\n    connectionType: string;\n    features: {\n      supportsWebhooks: boolean;\n      supportsPolling: boolean;\n      supportsWebSocket: boolean;\n    };\n    capabilities: Array<{\n      capability: string;\n      limitations?: string;\n    }>;\n    credentials: {\n      required: string[];\n      optional: string[];\n      example: Record<string, any>;\n    } | null;\n  }>;\n}",
      "TargetDto": "export interface TargetDto {\n  platformId: string;\n  type: TargetType;\n  id: string;\n}",
      "TargetType": "export type TargetType = 'user' | 'channel' | 'group';",
      "UpdateIdentityDto": "export interface UpdateIdentityDto {\n  displayName?: string;\n  email?: string;\n  metadata?: Record<string, any>;\n}",
      "UpdateMemberRoleDto": "export interface UpdateMemberRoleDto {\n  role: ProjectRole;\n}",
      "UpdatePasswordDto": "export interface UpdatePasswordDto {\n  currentPassword: string;\n  newPassword: string;\n}",
      "UpdatePlatformDto": "export interface UpdatePlatformDto {\n  name?: string;\n  description?: string;\n  credentials?: Record<string, any>;\n  isActive?: boolean;\n  testMode?: boolean;\n}",
      "UpdateProfileDto": "export interface UpdateProfileDto {\n  name?: string;\n}",
      "UpdateProfileResponse": "export interface UpdateProfileResponse {\n  message: string;\n  user: {\n    id: string;\n    email: string;\n    name: string | null;\n  };\n}",
      "UpdateProjectDto": "export interface UpdateProjectDto {\n  name?: string;\n  description?: string;\n  id?: string;\n  environment?: ProjectEnvironment;\n  isDefault?: boolean;\n  settings?: any;\n}",
      "UpdateWebhookDto": "export interface UpdateWebhookDto {\n  name?: string;\n  url?: string;\n  events?: WebhookEventType[];\n  isActive?: boolean;\n}",
      "WebhookDeliveryListResponse": "export interface WebhookDeliveryListResponse {\n  deliveries: WebhookDeliveryResponse[];\n  pagination: {\n    total: number;\n    limit: number;\n    offset: number;\n    hasMore: boolean;\n  };\n}",
      "WebhookDeliveryResponse": "export interface WebhookDeliveryResponse {\n  id: string;\n  event: WebhookEventType;\n  status: 'pending' | 'success' | 'failed';\n  responseCode: number | null;\n  error: string | null;\n  attempts: number;\n  deliveredAt: Date | null;\n  createdAt: Date;\n  payload: Record<string, unknown>;\n}",
      "WebhookDetailResponse": "export interface WebhookDetailResponse {\n  stats: {\n    total: number;\n    successful: number;\n    failed: number;\n    pending: number;\n    successRate: string;\n  };\n}",
      "WebhookEventType": "export type WebhookEventType = 'message.received' | 'message.sent' | 'message.failed' | 'button.clicked' | 'reaction.added' | 'reaction.removed';",
      "WebhookResponse": "export interface WebhookResponse {\n  id: string;\n  projectId: string;\n  name: string;\n  url: string;\n  events: WebhookEventType[];\n  secret: string;\n  isActive: boolean;\n  createdAt: Date;\n  updatedAt: Date;\n  message?: string;\n}"
    },
    "platformMetadata": {
      "whatsapp_evo": {
        "name": "whatsapp_evo",
        "displayName": "WhatsApp (Evolution API)",
        "connectionType": "webhook",
        "capabilities": [
          {
            "capability": "send-message"
          },
          {
            "capability": "receive-message"
          }
        ],
        "optionsSchema": null
      },
      "telegram": {
        "name": "telegram",
        "displayName": "Telegram",
        "connectionType": "webhook",
        "capabilities": [
          {
            "capability": "send-message"
          },
          {
            "capability": "receive-message"
          },
          {
            "capability": "voice-receive"
          }
        ],
        "optionsSchema": null
      },
      "email": {
        "name": "email",
        "displayName": "Email (SMTP)",
        "connectionType": "http",
        "capabilities": [
          {
            "capability": "send-message"
          }
        ],
        "optionsSchema": {
          "type": "object",
          "properties": {
            "cc": {
              "type": "array",
              "description": "CC recipients (Carbon Copy) Multiple recipients who will receive a copy of the email",
              "items": {
                "type": "string",
                "format": "email"
              }
            },
            "bcc": {
              "type": "array",
              "description": "BCC recipients (Blind Carbon Copy) Multiple recipients who will receive a copy without others knowing",
              "items": {
                "type": "string",
                "format": "email"
              }
            },
            "replyTo": {
              "type": "string",
              "description": "Reply-To address Email address where replies should be sent (different from sender)",
              "format": "email"
            },
            "headers": {
              "type": "object",
              "description": "Custom SMTP headers Advanced: Add custom headers to the email"
            }
          },
          "className": "EmailPlatformOptions"
        }
      },
      "discord": {
        "name": "discord",
        "displayName": "Discord",
        "connectionType": "websocket",
        "capabilities": [
          {
            "capability": "send-message"
          },
          {
            "capability": "receive-message"
          }
        ],
        "optionsSchema": null
      }
    }
  },
  {
    "controller": "WebhooksController",
    "method": "listWebhooks",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/webhooks",
    "contractMetadata": {
      "command": "webhooks list",
      "description": "List all webhooks for a project",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:read"
      ],
      "outputType": "WebhookResponse[]",
      "examples": [
        {
          "description": "List all webhooks",
          "command": "msgcore webhooks list"
        }
      ]
    }
  },
  {
    "controller": "WebhooksController",
    "method": "getWebhook",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/webhooks/:webhookId",
    "contractMetadata": {
      "command": "webhooks get",
      "description": "Get a specific webhook with delivery statistics",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:read"
      ],
      "outputType": "WebhookDetailResponse",
      "options": {
        "webhookId": {
          "required": true,
          "description": "Webhook ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get webhook details",
          "command": "msgcore webhooks get --webhookId \"webhook-123\""
        }
      ]
    }
  },
  {
    "controller": "WebhooksController",
    "method": "updateWebhook",
    "httpMethod": "PATCH",
    "path": "/api/v1/projects/:project/webhooks/:webhookId",
    "contractMetadata": {
      "command": "webhooks update",
      "description": "Update a webhook configuration",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:write"
      ],
      "inputType": "UpdateWebhookDto",
      "outputType": "WebhookResponse",
      "options": {
        "webhookId": {
          "required": true,
          "description": "Webhook ID",
          "type": "string"
        },
        "name": {
          "description": "New webhook name",
          "type": "string"
        },
        "url": {
          "description": "New webhook URL",
          "type": "string"
        },
        "events": {
          "description": "New events subscription",
          "type": "array"
        },
        "isActive": {
          "description": "Enable or disable webhook",
          "type": "boolean"
        }
      },
      "examples": [
        {
          "description": "Disable a webhook",
          "command": "msgcore webhooks update --webhookId \"webhook-123\" --isActive false"
        },
        {
          "description": "Update webhook URL",
          "command": "msgcore webhooks update --webhookId \"webhook-123\" --url \"https://newurl.com/webhooks\""
        }
      ]
    }
  },
  {
    "controller": "WebhooksController",
    "method": "deleteWebhook",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/webhooks/:webhookId",
    "contractMetadata": {
      "command": "webhooks delete",
      "description": "Delete a webhook",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "webhookId": {
          "required": true,
          "description": "Webhook ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Delete a webhook",
          "command": "msgcore webhooks delete --webhookId \"webhook-123\""
        }
      ]
    }
  },
  {
    "controller": "WebhooksController",
    "method": "getDeliveries",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/webhooks/:webhookId/deliveries",
    "contractMetadata": {
      "command": "webhooks deliveries",
      "description": "List webhook delivery attempts with filtering",
      "category": "Webhooks",
      "requiredScopes": [
        "webhooks:read"
      ],
      "outputType": "WebhookDeliveryListResponse",
      "options": {
        "webhookId": {
          "required": true,
          "description": "Webhook ID",
          "type": "string"
        },
        "event": {
          "description": "Filter by event type",
          "type": "string",
          "choices": null
        },
        "status": {
          "description": "Filter by delivery status",
          "type": "string",
          "choices": [
            "pending",
            "success",
            "failed"
          ]
        },
        "limit": {
          "description": "Number of deliveries to return (1-100)",
          "type": "number",
          "default": 50
        },
        "offset": {
          "description": "Number of deliveries to skip",
          "type": "number",
          "default": 0
        }
      },
      "examples": [
        {
          "description": "List recent deliveries",
          "command": "msgcore webhooks deliveries --webhookId \"webhook-123\""
        },
        {
          "description": "List failed deliveries",
          "command": "msgcore webhooks deliveries --webhookId \"webhook-123\" --status failed"
        }
      ]
    }
  },
  {
    "controller": "ProjectsController",
    "method": "create",
    "httpMethod": "POST",
    "path": "/api/v1/projects",
    "contractMetadata": {
      "command": "projects create",
      "description": "Create a new project",
      "category": "Projects",
      "requiredScopes": [
        "projects:write"
      ],
      "inputType": "CreateProjectDto",
      "outputType": "ProjectResponse",
      "options": {
        "name": {
          "required": true,
          "description": "Project name",
          "type": "string"
        },
        "description": {
          "description": "Project description",
          "type": "string"
        },
        "environment": {
          "description": "Project environment",
          "choices": [
            "development",
            "staging",
            "production"
          ],
          "default": "development",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Create a simple project",
          "command": "msgcore projects create --name \"My Project\""
        },
        {
          "description": "Create a project with description",
          "command": "msgcore projects create --name \"My Project\" --description \"A project for testing new features\""
        },
        {
          "description": "Create a production project",
          "command": "msgcore projects create --name \"My Project\" --description \"Production messaging service\" --environment production"
        }
      ]
    }
  },
  {
    "controller": "ProjectsController",
    "method": "findAll",
    "httpMethod": "GET",
    "path": "/api/v1/projects",
    "contractMetadata": {
      "command": "projects list",
      "description": "List all projects",
      "category": "Projects",
      "requiredScopes": [
        "projects:read"
      ],
      "outputType": "ProjectResponse[]",
      "examples": [
        {
          "description": "List all projects",
          "command": "msgcore projects list"
        }
      ]
    }
  },
  {
    "controller": "ProjectsController",
    "method": "findOne",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project",
    "contractMetadata": {
      "command": "projects get",
      "description": "Get project details",
      "category": "Projects",
      "requiredScopes": [
        "projects:read"
      ],
      "outputType": "ProjectResponse",
      "examples": [
        {
          "description": "Get project details",
          "command": "msgcore projects get my-project"
        }
      ]
    }
  },
  {
    "controller": "ProjectsController",
    "method": "update",
    "httpMethod": "PATCH",
    "path": "/api/v1/projects/:project",
    "contractMetadata": {
      "command": "projects update",
      "description": "Update project name, description and settings",
      "category": "Projects",
      "requiredScopes": [
        "projects:write"
      ],
      "inputType": "UpdateProjectDto",
      "outputType": "ProjectResponse",
      "options": {
        "name": {
          "description": "Project name",
          "type": "string"
        },
        "description": {
          "description": "Project description",
          "type": "string"
        },
        "environment": {
          "description": "Project environment",
          "choices": [
            "development",
            "staging",
            "production"
          ],
          "type": "string"
        },
        "isDefault": {
          "description": "Set as default project",
          "type": "boolean"
        }
      },
      "examples": [
        {
          "description": "Update project name",
          "command": "msgcore projects update my-project --name \"New Project Name\""
        },
        {
          "description": "Update project description",
          "command": "msgcore projects update my-project --description \"Updated project description\""
        },
        {
          "description": "Update both name and description",
          "command": "msgcore projects update my-project --name \"New Name\" --description \"New description\""
        }
      ]
    }
  },
  {
    "controller": "ProjectsController",
    "method": "remove",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project",
    "contractMetadata": {
      "command": "projects delete",
      "description": "Delete a project",
      "category": "Projects",
      "requiredScopes": [
        "projects:write"
      ],
      "outputType": "MessageResponse",
      "examples": [
        {
          "description": "Delete a project",
          "command": "msgcore projects delete my-project"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "getMessages",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/messages",
    "contractMetadata": {
      "command": "messages list",
      "description": "List received messages for a project",
      "category": "Messages",
      "requiredScopes": [
        "messages:read"
      ],
      "inputType": "QueryMessagesDto",
      "outputType": "MessageListResponse",
      "options": {
        "platformId": {
          "description": "Filter by platform ID",
          "type": "string"
        },
        "platform": {
          "description": "Filter by platform type (telegram, discord, whatsapp-evo)",
          "type": "string",
          "choices": [
            "telegram",
            "discord",
            "whatsapp-evo"
          ]
        },
        "chatId": {
          "description": "Filter by chat/channel ID",
          "type": "string"
        },
        "userId": {
          "description": "Filter by user ID",
          "type": "string"
        },
        "startDate": {
          "description": "Filter messages after this date (ISO 8601)",
          "type": "string"
        },
        "endDate": {
          "description": "Filter messages before this date (ISO 8601)",
          "type": "string"
        },
        "limit": {
          "description": "Number of messages to return (1-100)",
          "type": "number",
          "default": 50
        },
        "offset": {
          "description": "Number of messages to skip",
          "type": "number",
          "default": 0
        },
        "order": {
          "description": "Sort order (asc or desc)",
          "type": "string",
          "choices": [
            "asc",
            "desc"
          ],
          "default": "desc"
        },
        "raw": {
          "description": "Include raw platform message data",
          "type": "boolean",
          "default": false
        },
        "reactions": {
          "description": "Include reactions on each message",
          "type": "boolean",
          "default": false
        }
      },
      "examples": [
        {
          "description": "Get latest 50 messages",
          "command": "msgcore messages list"
        },
        {
          "description": "Get messages from specific platform instance",
          "command": "msgcore messages list --platformId \"platform-abc123\" --chatId \"123456789\""
        },
        {
          "description": "Get Telegram messages from any instance",
          "command": "msgcore messages list --platform telegram --chatId \"123456789\""
        },
        {
          "description": "Get messages from last 24 hours",
          "command": "msgcore messages list --startDate \"2024-01-01T00:00:00Z\""
        },
        {
          "description": "Get messages with raw platform data",
          "command": "msgcore messages list --raw --limit 5"
        },
        {
          "description": "Get messages with reactions included",
          "command": "msgcore messages list --reactions --limit 10"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "getMessageStats",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/messages/stats",
    "contractMetadata": {
      "command": "messages stats",
      "description": "Get message statistics for a project",
      "category": "Messages",
      "requiredScopes": [
        "messages:read"
      ],
      "outputType": "MessageStatsResponse",
      "examples": [
        {
          "description": "Get message statistics",
          "command": "msgcore messages stats"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "getSentMessages",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/messages/sent",
    "contractMetadata": {
      "command": "messages sent",
      "description": "List sent messages for a project",
      "category": "Messages",
      "requiredScopes": [
        "messages:read"
      ],
      "outputType": "SentMessageListResponse",
      "options": {
        "platform": {
          "description": "Filter by platform",
          "type": "string"
        },
        "status": {
          "description": "Filter by status (pending, sent, failed)",
          "type": "string",
          "choices": [
            "pending",
            "sent",
            "failed"
          ]
        },
        "limit": {
          "description": "Number of messages to return",
          "type": "number",
          "default": 50
        },
        "offset": {
          "description": "Number of messages to skip",
          "type": "number",
          "default": 0
        }
      },
      "examples": [
        {
          "description": "Get sent messages",
          "command": "msgcore messages sent"
        },
        {
          "description": "Get failed messages",
          "command": "msgcore messages sent --status failed"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "getMessage",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/messages/:messageId",
    "contractMetadata": {
      "command": "messages get",
      "description": "Get a specific message by ID",
      "category": "Messages",
      "requiredScopes": [
        "messages:read"
      ],
      "outputType": "ReceivedMessageResponse",
      "options": {
        "messageId": {
          "required": true,
          "description": "Message ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get specific message",
          "command": "msgcore messages get --messageId \"msg-123\""
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "deleteOldMessages",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/messages/cleanup",
    "contractMetadata": {
      "command": "messages cleanup",
      "description": "Delete messages older than specified days",
      "category": "Messages",
      "requiredScopes": [
        "messages:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "daysBefore": {
          "required": true,
          "description": "Delete messages older than this many days",
          "type": "number"
        }
      },
      "examples": [
        {
          "description": "Delete messages older than 30 days",
          "command": "msgcore messages cleanup --daysBefore 30"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "sendMessage",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/messages/send",
    "contractMetadata": {
      "command": "messages send",
      "description": "Send a message to platforms",
      "category": "Messages",
      "requiredScopes": [
        "messages:write"
      ],
      "inputType": "SendMessageDto",
      "outputType": "MessageSendResponse",
      "options": {
        "target": {
          "description": "Single target in format: platformId:type:id",
          "type": "target_pattern"
        },
        "targets": {
          "description": "Multiple targets comma-separated: platformId:type:id,platformId:type:id",
          "type": "targets_pattern"
        },
        "text": {
          "description": "Message text content",
          "type": "string"
        },
        "content": {
          "description": "Full message content object (advanced)",
          "type": "object"
        },
        "options": {
          "description": "Message options",
          "type": "object"
        },
        "metadata": {
          "description": "Message metadata",
          "type": "object"
        }
      },
      "examples": [
        {
          "description": "Send to single user",
          "command": "msgcore messages send --target \"platformId:user:253191879\" --text \"Hello!\""
        },
        {
          "description": "Send to multiple targets",
          "command": "msgcore messages send --targets \"platform1:user:123,platform2:channel:456\" --text \"Broadcast message\""
        },
        {
          "description": "Advanced with full content object",
          "command": "msgcore messages send --target \"platformId:user:123\" --content '{\"text\":\"Hello\",\"buttons\":[{\"text\":\"Click me\"}]}'"
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "getMessageStatus",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/messages/status/:jobId",
    "contractMetadata": {
      "command": "messages status",
      "description": "Check message delivery status",
      "category": "Messages",
      "requiredScopes": [
        "messages:read"
      ],
      "outputType": "MessageStatusResponse",
      "options": {
        "jobId": {
          "required": true,
          "description": "Message job ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Check message status",
          "command": "msgcore messages status --jobId \"job-123\""
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "retryMessage",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/messages/retry/:jobId",
    "contractMetadata": {
      "command": "messages retry",
      "description": "Retry a failed message",
      "category": "Messages",
      "requiredScopes": [
        "messages:write"
      ],
      "outputType": "MessageRetryResponse",
      "options": {
        "jobId": {
          "required": true,
          "description": "Failed message job ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Retry failed message",
          "command": "msgcore messages retry --jobId \"job-123\""
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "reactToMessage",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/messages/react",
    "contractMetadata": {
      "command": "messages react",
      "description": "Add a reaction to a message",
      "category": "Messages",
      "requiredScopes": [
        "messages:write"
      ],
      "inputType": "SendReactionDto",
      "outputType": "MessageResponse",
      "options": {
        "platformId": {
          "required": true,
          "description": "Platform configuration ID",
          "type": "string"
        },
        "messageId": {
          "required": true,
          "description": "Message ID to react to",
          "type": "string"
        },
        "emoji": {
          "required": true,
          "description": "Emoji to react with (e.g., \"👍\", \"❤️\")",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "React with thumbs up",
          "command": "msgcore messages react --platformId \"platform-123\" --messageId \"msg-456\" --emoji \"👍\""
        },
        {
          "description": "React with heart",
          "command": "msgcore messages react --platformId \"platform-123\" --messageId \"msg-456\" --emoji \"❤️\""
        }
      ]
    }
  },
  {
    "controller": "MessagesController",
    "method": "unreactToMessage",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/messages/unreact",
    "contractMetadata": {
      "command": "messages unreact",
      "description": "Remove a reaction from a message",
      "category": "Messages",
      "requiredScopes": [
        "messages:write"
      ],
      "inputType": "SendReactionDto",
      "outputType": "MessageResponse",
      "options": {
        "platformId": {
          "required": true,
          "description": "Platform configuration ID",
          "type": "string"
        },
        "messageId": {
          "required": true,
          "description": "Message ID to unreact from",
          "type": "string"
        },
        "emoji": {
          "required": true,
          "description": "Emoji to remove (e.g., \"👍\", \"❤️\")",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Remove thumbs up reaction",
          "command": "msgcore messages unreact --platformId \"platform-123\" --messageId \"msg-456\" --emoji \"👍\""
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "create",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/platforms",
    "contractMetadata": {
      "command": "platforms create",
      "description": "Configure a new platform integration",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:write"
      ],
      "inputType": "CreatePlatformDto",
      "outputType": "PlatformResponse",
      "options": {
        "platform": {
          "required": true,
          "description": "Platform type",
          "choices": [
            "discord",
            "telegram",
            "whatsapp-evo"
          ],
          "type": "string"
        },
        "name": {
          "required": true,
          "description": "Friendly name for the platform instance",
          "type": "string"
        },
        "description": {
          "description": "Optional description for the platform instance",
          "type": "string"
        },
        "credentials": {
          "required": true,
          "description": "Platform credentials (JSON object). Use \"msgcore platforms supported\" to see required fields for each platform.",
          "type": "object"
        },
        "isActive": {
          "description": "Enable platform",
          "default": true,
          "type": "boolean"
        },
        "testMode": {
          "description": "Enable test mode",
          "default": false,
          "type": "boolean"
        }
      },
      "examples": [
        {
          "description": "Add Discord bot",
          "command": "msgcore platforms create --platform discord --name \"Main Discord Bot\" --credentials '{\"token\":\"YOUR_DISCORD_BOT_TOKEN\"}'"
        },
        {
          "description": "Add Telegram bot in test mode",
          "command": "msgcore platforms create --platform telegram --name \"Test Telegram Bot\" --description \"Bot for testing purposes\" --credentials '{\"token\":\"YOUR_TELEGRAM_BOT_TOKEN\"}' --testMode true"
        },
        {
          "description": "Add WhatsApp Evolution API",
          "command": "msgcore platforms create --platform whatsapp-evo --name \"Production WhatsApp\" --credentials '{\"evolutionApiUrl\":\"https://your-evolution-api.com\",\"evolutionApiKey\":\"YOUR_EVOLUTION_API_KEY\"}'"
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "findAll",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms",
    "contractMetadata": {
      "command": "platforms list",
      "description": "List configured platforms for project",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "PlatformResponse[]",
      "examples": [
        {
          "description": "List all platforms",
          "command": "msgcore platforms list"
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "findOne",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms/:id",
    "contractMetadata": {
      "command": "platforms get",
      "description": "Get platform configuration details",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "PlatformResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Platform ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get platform details",
          "command": "msgcore platforms get --id \"platform-123\""
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "update",
    "httpMethod": "PATCH",
    "path": "/api/v1/projects/:project/platforms/:id",
    "contractMetadata": {
      "command": "platforms update",
      "description": "Update platform configuration",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:write"
      ],
      "inputType": "UpdatePlatformDto",
      "outputType": "PlatformResponse",
      "options": {
        "name": {
          "description": "Updated friendly name",
          "type": "string"
        },
        "description": {
          "description": "Updated description",
          "type": "string"
        },
        "credentials": {
          "description": "Updated credentials (JSON object)",
          "type": "object"
        },
        "isActive": {
          "description": "Enable/disable platform",
          "type": "boolean"
        },
        "testMode": {
          "description": "Enable/disable test mode",
          "type": "boolean"
        }
      },
      "examples": [
        {
          "description": "Update platform name and description",
          "command": "msgcore platforms update --project my-project --id platform-123 --name \"Updated Bot Name\" --description \"New description\""
        },
        {
          "description": "Update Telegram bot token",
          "command": "msgcore platforms update --project my-project --id platform-123 --credentials '{\"token\":\"YOUR_NEW_TELEGRAM_TOKEN\"}'"
        },
        {
          "description": "Disable platform",
          "command": "msgcore platforms update --project my-project --id platform-123 --isActive false"
        },
        {
          "description": "Enable test mode",
          "command": "msgcore platforms update --project my-project --id platform-123 --testMode true"
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "remove",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/platforms/:id",
    "contractMetadata": {
      "command": "platforms delete",
      "description": "Remove platform configuration",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Platform ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Remove platform",
          "command": "msgcore platforms delete --id \"platform-123\""
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "registerWebhook",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/platforms/:id/register-webhook",
    "contractMetadata": {
      "command": "platforms register-webhook",
      "description": "Register webhook URL with platform provider",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Platform ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Register Telegram webhook",
          "command": "msgcore platforms register-webhook --id \"platform-123\""
        }
      ]
    }
  },
  {
    "controller": "PlatformsController",
    "method": "getQRCode",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms/:id/qr-code",
    "contractMetadata": {
      "command": "platforms qr-code",
      "description": "Get QR code for WhatsApp authentication",
      "category": "Platforms",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "MessageResponse",
      "options": {
        "id": {
          "required": true,
          "description": "WhatsApp Platform ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get WhatsApp QR code",
          "command": "msgcore platforms qr-code --id \"platform-123\""
        }
      ]
    }
  },
  {
    "controller": "MembersController",
    "method": "listMembers",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/members",
    "contractMetadata": {
      "command": "members list",
      "description": "List all members of a project",
      "category": "Members",
      "requiredScopes": [
        "members:read"
      ],
      "outputType": "ProjectMemberResponse[]",
      "examples": [
        {
          "description": "List all project members",
          "command": "msgcore members list my-project"
        }
      ]
    }
  },
  {
    "controller": "MembersController",
    "method": "addMember",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/members",
    "contractMetadata": {
      "command": "members add",
      "description": "Add a member to a project",
      "category": "Members",
      "requiredScopes": [
        "members:write"
      ],
      "inputType": "AddMemberDto",
      "outputType": "ProjectMemberResponse",
      "options": {
        "email": {
          "required": true,
          "description": "Email of user to add",
          "type": "string"
        },
        "role": {
          "required": true,
          "description": "Role to assign to the member",
          "choices": [
            "owner",
            "admin",
            "member",
            "viewer"
          ],
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Add a member with admin role",
          "command": "msgcore members add my-project --email user@example.com --role admin"
        },
        {
          "description": "Add a viewer to the project",
          "command": "msgcore members add my-project --email viewer@example.com --role viewer"
        }
      ]
    }
  },
  {
    "controller": "MembersController",
    "method": "updateMemberRole",
    "httpMethod": "PATCH",
    "path": "/api/v1/projects/:project/members/:userId",
    "contractMetadata": {
      "command": "members update",
      "description": "Update a member role in a project",
      "category": "Members",
      "requiredScopes": [
        "members:write"
      ],
      "inputType": "UpdateMemberRoleDto",
      "outputType": "ProjectMemberResponse",
      "options": {
        "userId": {
          "required": true,
          "description": "User ID of the member to update",
          "type": "string"
        },
        "role": {
          "required": true,
          "description": "New role to assign",
          "choices": [
            "admin",
            "member",
            "viewer"
          ],
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Promote member to admin",
          "command": "msgcore members update my-project user-123 --role admin"
        },
        {
          "description": "Demote admin to member",
          "command": "msgcore members update my-project user-123 --role member"
        }
      ]
    }
  },
  {
    "controller": "MembersController",
    "method": "removeMember",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/members/:userId",
    "contractMetadata": {
      "command": "members remove",
      "description": "Remove a member from a project",
      "category": "Members",
      "requiredScopes": [
        "members:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "userId": {
          "required": true,
          "description": "User ID of the member to remove",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Remove a member from project",
          "command": "msgcore members remove my-project user-123"
        }
      ]
    }
  },
  {
    "controller": "MembersController",
    "method": "inviteMember",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/members/invite",
    "contractMetadata": {
      "command": "members invite",
      "description": "Invite a user to join a project",
      "category": "Members",
      "requiredScopes": [
        "members:write"
      ],
      "inputType": "CreateInviteDto",
      "outputType": "InviteResponse",
      "options": {
        "email": {
          "required": true,
          "description": "Email address of user to invite",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Invite a user to project",
          "command": "msgcore members invite my-project --email user@example.com"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "create",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/identities",
    "contractMetadata": {
      "command": "identities create",
      "description": "Create a new identity with platform aliases",
      "category": "Identities",
      "requiredScopes": [
        "identities:write"
      ],
      "inputType": "CreateIdentityDto",
      "outputType": "IdentityResponse",
      "options": {
        "displayName": {
          "description": "Display name for the identity",
          "type": "string"
        },
        "email": {
          "description": "Email address for the identity",
          "type": "string"
        },
        "metadata": {
          "description": "JSON metadata for the identity",
          "type": "string"
        },
        "aliases": {
          "required": true,
          "description": "JSON array of platform aliases",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Create identity with Discord and Telegram aliases",
          "command": "msgcore identities create --displayName \"John Doe\" --email \"john@example.com\" --aliases '[{\"platformId\":\"platform-123\",\"providerUserId\":\"discord-456\",\"providerUserDisplay\":\"JohnD#1234\"}]'"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "findAll",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/identities",
    "contractMetadata": {
      "command": "identities list",
      "description": "List all identities for a project",
      "category": "Identities",
      "requiredScopes": [
        "identities:read"
      ],
      "outputType": "IdentityResponse[]",
      "examples": [
        {
          "description": "List all identities",
          "command": "msgcore identities list"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "lookup",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/identities/lookup",
    "contractMetadata": {
      "command": "identities lookup",
      "description": "Lookup identity by platform user ID",
      "category": "Identities",
      "requiredScopes": [
        "identities:read"
      ],
      "outputType": "IdentityResponse",
      "options": {
        "platformId": {
          "required": true,
          "description": "Platform configuration ID",
          "type": "string"
        },
        "providerUserId": {
          "required": true,
          "description": "Provider-specific user ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Lookup identity by Discord user",
          "command": "msgcore identities lookup --platformId platform-123 --providerUserId discord-456"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "findOne",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/identities/:id",
    "contractMetadata": {
      "command": "identities get",
      "description": "Get a specific identity by ID",
      "category": "Identities",
      "requiredScopes": [
        "identities:read"
      ],
      "outputType": "IdentityResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get identity details",
          "command": "msgcore identities get identity-123"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "update",
    "httpMethod": "PATCH",
    "path": "/api/v1/projects/:project/identities/:id",
    "contractMetadata": {
      "command": "identities update",
      "description": "Update identity metadata (display name, email, metadata)",
      "category": "Identities",
      "requiredScopes": [
        "identities:write"
      ],
      "inputType": "UpdateIdentityDto",
      "outputType": "IdentityResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        },
        "displayName": {
          "description": "Updated display name",
          "type": "string"
        },
        "email": {
          "description": "Updated email address",
          "type": "string"
        },
        "metadata": {
          "description": "Updated JSON metadata",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Update identity display name",
          "command": "msgcore identities update identity-123 --displayName \"Jane Doe\""
        },
        {
          "description": "Update identity email and metadata",
          "command": "msgcore identities update identity-123 --email \"jane@example.com\" --metadata '{\"tier\":\"premium\"}'"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "addAlias",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/identities/:id/aliases",
    "contractMetadata": {
      "command": "identities add-alias",
      "description": "Add a platform alias to an existing identity",
      "category": "Identities",
      "requiredScopes": [
        "identities:write"
      ],
      "inputType": "AddAliasDto",
      "outputType": "IdentityAliasResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        },
        "platformId": {
          "required": true,
          "description": "Platform configuration ID",
          "type": "string"
        },
        "providerUserId": {
          "required": true,
          "description": "Provider-specific user ID",
          "type": "string"
        },
        "providerUserDisplay": {
          "description": "Display name on the platform",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Link WhatsApp account to existing identity",
          "command": "msgcore identities add-alias identity-123 --platformId platform-789 --providerUserId \"+1234567890\" --providerUserDisplay \"John Mobile\""
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "removeAlias",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/identities/:id/aliases/:aliasId",
    "contractMetadata": {
      "command": "identities remove-alias",
      "description": "Remove a platform alias from an identity",
      "category": "Identities",
      "requiredScopes": [
        "identities:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        },
        "aliasId": {
          "required": true,
          "description": "Alias ID to remove",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Unlink platform account from identity",
          "command": "msgcore identities remove-alias identity-123 alias-456"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "remove",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/identities/:id",
    "contractMetadata": {
      "command": "identities delete",
      "description": "Delete an identity and all its aliases",
      "category": "Identities",
      "requiredScopes": [
        "identities:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID to delete",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Delete an identity",
          "command": "msgcore identities delete identity-123"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "getMessages",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/identities/:id/messages",
    "contractMetadata": {
      "command": "identities messages",
      "description": "Get all messages for an identity (across all linked platform accounts)",
      "category": "Identities",
      "requiredScopes": [
        "identities:read",
        "messages:read"
      ],
      "outputType": "ReceivedMessageResponse[]",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get all messages for an identity",
          "command": "msgcore identities messages identity-123"
        }
      ]
    }
  },
  {
    "controller": "IdentitiesController",
    "method": "getReactions",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/identities/:id/reactions",
    "contractMetadata": {
      "command": "identities reactions",
      "description": "Get all reactions for an identity (across all linked platform accounts)",
      "category": "Identities",
      "requiredScopes": [
        "identities:read",
        "messages:read"
      ],
      "outputType": "ReceivedReactionResponse[]",
      "options": {
        "id": {
          "required": true,
          "description": "Identity ID",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Get all reactions for an identity",
          "command": "msgcore identities reactions identity-123"
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "signup",
    "httpMethod": "POST",
    "path": "/api/v1/auth/signup",
    "contractMetadata": {
      "command": "auth signup",
      "description": "Create a new user account (first user becomes admin)",
      "category": "Auth",
      "requiredScopes": [],
      "excludeFromMcp": true,
      "inputType": "SignupDto",
      "outputType": "AuthResponse",
      "options": {
        "email": {
          "required": true,
          "description": "Email address",
          "type": "string"
        },
        "password": {
          "required": true,
          "description": "Password (min 8 chars, 1 uppercase, 1 number)",
          "type": "string"
        },
        "name": {
          "required": false,
          "description": "Full name",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Create first admin user",
          "command": "msgcore auth signup --email admin@example.com --password Admin123 --name \"Admin User\""
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "login",
    "httpMethod": "POST",
    "path": "/api/v1/auth/login",
    "contractMetadata": {
      "command": "auth login",
      "description": "Login with email and password",
      "category": "Auth",
      "requiredScopes": [],
      "excludeFromMcp": true,
      "inputType": "LoginDto",
      "outputType": "AuthResponse",
      "options": {
        "email": {
          "required": true,
          "description": "Email address",
          "type": "string"
        },
        "password": {
          "required": true,
          "description": "Password",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Login with email and password",
          "command": "msgcore auth login --email admin@example.com --password Admin123"
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "acceptInvite",
    "httpMethod": "POST",
    "path": "/api/v1/auth/accept-invite",
    "contractMetadata": {
      "command": "auth accept-invite",
      "description": "Accept a project invitation and create account",
      "category": "Auth",
      "requiredScopes": [],
      "excludeFromMcp": true,
      "inputType": "AcceptInviteDto",
      "outputType": "AuthResponse",
      "options": {
        "token": {
          "required": true,
          "description": "Invite token from invitation link",
          "type": "string"
        },
        "name": {
          "required": true,
          "description": "Full name",
          "type": "string"
        },
        "password": {
          "required": true,
          "description": "Password (min 8 chars, 1 uppercase, 1 number)",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Accept invitation",
          "command": "msgcore auth accept-invite --token abc123... --name \"John Doe\" --password SecurePass123"
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "getPermissions",
    "httpMethod": "GET",
    "path": "/api/v1/auth/whoami",
    "contractMetadata": {
      "command": "auth whoami",
      "description": "Get current authentication context and permissions",
      "category": "Auth",
      "requiredScopes": [],
      "outputType": "PermissionResponse",
      "examples": [
        {
          "description": "Check your authentication context",
          "command": "msgcore auth whoami"
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "updatePassword",
    "httpMethod": "PATCH",
    "path": "/api/v1/auth/password",
    "contractMetadata": {
      "command": "auth update-password",
      "description": "Update your password (requires current password)",
      "category": "Auth",
      "requiredScopes": [],
      "excludeFromMcp": true,
      "inputType": "UpdatePasswordDto",
      "outputType": "MessageResponse",
      "options": {
        "currentPassword": {
          "required": true,
          "description": "Current password",
          "type": "string"
        },
        "newPassword": {
          "required": true,
          "description": "New password (min 8 chars, 1 uppercase, 1 number)",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Update your password",
          "command": "msgcore auth update-password --currentPassword OldPass123 --newPassword NewPass456"
        }
      ]
    }
  },
  {
    "controller": "AuthController",
    "method": "updateProfile",
    "httpMethod": "PATCH",
    "path": "/api/v1/auth/profile",
    "contractMetadata": {
      "command": "auth update-profile",
      "description": "Update your profile information",
      "category": "Auth",
      "requiredScopes": [],
      "inputType": "UpdateProfileDto",
      "outputType": "UpdateProfileResponse",
      "options": {
        "name": {
          "required": false,
          "description": "Full name",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Update your name",
          "command": "msgcore auth update-profile --name \"John Doe\""
        }
      ]
    }
  },
  {
    "controller": "ApiKeysController",
    "method": "create",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/keys",
    "contractMetadata": {
      "command": "keys create",
      "description": "Generate a new API key",
      "category": "ApiKeys",
      "requiredScopes": [
        "keys:write"
      ],
      "inputType": "CreateApiKeyDto",
      "outputType": "ApiKeyResponse",
      "options": {
        "name": {
          "required": true,
          "description": "API key name",
          "type": "string"
        },
        "scopes": {
          "required": true,
          "description": "Array of scope strings (e.g., [\"messages:read\", \"messages:write\"])",
          "type": "array"
        },
        "expiresInDays": {
          "description": "Expiration in days",
          "type": "number"
        }
      },
      "examples": [
        {
          "description": "Create messaging API key",
          "command": "msgcore keys create --name \"Bot Key\" --scopes \"messages:send,messages:read\""
        }
      ]
    }
  },
  {
    "controller": "ApiKeysController",
    "method": "findAll",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/keys",
    "contractMetadata": {
      "command": "keys list",
      "description": "List all API keys for project",
      "category": "ApiKeys",
      "requiredScopes": [
        "keys:read"
      ],
      "outputType": "ApiKeyListResponse[]",
      "examples": [
        {
          "description": "List all API keys",
          "command": "msgcore keys list"
        }
      ]
    }
  },
  {
    "controller": "ApiKeysController",
    "method": "revoke",
    "httpMethod": "DELETE",
    "path": "/api/v1/projects/:project/keys/:keyId",
    "contractMetadata": {
      "command": "keys revoke",
      "description": "Revoke an API key",
      "category": "ApiKeys",
      "requiredScopes": [
        "keys:write"
      ],
      "outputType": "MessageResponse",
      "options": {
        "keyId": {
          "required": true,
          "description": "API key ID to revoke",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Revoke an API key",
          "command": "msgcore keys revoke --keyId \"key-123\""
        }
      ]
    }
  },
  {
    "controller": "ApiKeysController",
    "method": "roll",
    "httpMethod": "POST",
    "path": "/api/v1/projects/:project/keys/:keyId/roll",
    "contractMetadata": {
      "command": "keys roll",
      "description": "Roll an API key (generate new key, revoke old after 24h)",
      "category": "ApiKeys",
      "requiredScopes": [
        "keys:write"
      ],
      "outputType": "ApiKeyRollResponse",
      "options": {
        "keyId": {
          "required": true,
          "description": "API key ID to roll",
          "type": "string"
        }
      },
      "examples": [
        {
          "description": "Roll an API key",
          "command": "msgcore keys roll --keyId \"key-123\""
        }
      ]
    }
  },
  {
    "controller": "PlatformLogsController",
    "method": "listLogs",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms/logs",
    "contractMetadata": {
      "command": "platforms logs list",
      "description": "List platform processing logs for a project",
      "category": "Platform Logs",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "PlatformLogsResponse",
      "options": {
        "platform": {
          "description": "Filter by platform (telegram, discord)",
          "type": "string"
        },
        "level": {
          "description": "Filter by log level",
          "choices": [
            "info",
            "warn",
            "error",
            "debug"
          ],
          "type": "string"
        },
        "category": {
          "description": "Filter by log category",
          "choices": [
            "connection",
            "webhook",
            "message",
            "error",
            "auth",
            "general"
          ],
          "type": "string"
        },
        "startDate": {
          "description": "Filter logs after this date (ISO 8601)",
          "type": "string"
        },
        "endDate": {
          "description": "Filter logs before this date (ISO 8601)",
          "type": "string"
        },
        "limit": {
          "description": "Number of logs to return (1-1000)",
          "type": "number",
          "default": "100"
        },
        "offset": {
          "description": "Number of logs to skip",
          "type": "number"
        }
      },
      "examples": [
        {
          "description": "List recent platform logs",
          "command": "msgcore platforms logs list my-project"
        },
        {
          "description": "List only error logs",
          "command": "msgcore platforms logs list my-project --level error"
        },
        {
          "description": "List webhook logs for Telegram",
          "command": "msgcore platforms logs list my-project --platform telegram --category webhook"
        }
      ]
    }
  },
  {
    "controller": "PlatformLogsController",
    "method": "getPlatformLogs",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms/:platformId/logs",
    "contractMetadata": {
      "command": "platforms logs get",
      "description": "List logs for a specific platform configuration",
      "category": "Platform Logs",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "PlatformLogsResponse",
      "options": {
        "level": {
          "description": "Filter by log level",
          "choices": [
            "info",
            "warn",
            "error",
            "debug"
          ],
          "type": "string"
        },
        "category": {
          "description": "Filter by log category",
          "choices": [
            "connection",
            "webhook",
            "message",
            "error",
            "auth",
            "general"
          ],
          "type": "string"
        },
        "startDate": {
          "description": "Filter logs after this date (ISO 8601)",
          "type": "string"
        },
        "endDate": {
          "description": "Filter logs before this date (ISO 8601)",
          "type": "string"
        },
        "limit": {
          "description": "Number of logs to return (1-1000)",
          "type": "number",
          "default": "100"
        },
        "offset": {
          "description": "Number of logs to skip",
          "type": "number"
        }
      },
      "examples": [
        {
          "description": "List logs for specific platform",
          "command": "msgcore platforms logs get my-project platform-id-123"
        },
        {
          "description": "List recent errors for platform",
          "command": "msgcore platforms logs get my-project platform-id-123 --level error --limit 50"
        }
      ]
    }
  },
  {
    "controller": "PlatformLogsController",
    "method": "getLogStats",
    "httpMethod": "GET",
    "path": "/api/v1/projects/:project/platforms/logs/stats",
    "contractMetadata": {
      "command": "platforms logs stats",
      "description": "Get platform logs statistics and recent errors",
      "category": "Platform Logs",
      "requiredScopes": [
        "platforms:read"
      ],
      "outputType": "PlatformLogStatsResponse",
      "examples": [
        {
          "description": "Get platform logs statistics",
          "command": "msgcore platforms logs stats my-project"
        }
      ]
    }
  },
  {
    "controller": "PlatformHealthController",
    "method": "getSupportedPlatforms",
    "httpMethod": "GET",
    "path": "/api/v1/platforms/supported",
    "contractMetadata": {
      "command": "platforms supported",
      "description": "List supported platforms with credential requirements",
      "category": "Platforms",
      "requiredScopes": [],
      "excludeFromMcp": true,
      "outputType": "SupportedPlatformsResponse",
      "examples": [
        {
          "description": "List supported platforms",
          "command": "msgcore platforms supported"
        }
      ]
    }
  }
];

interface CLIConfig {
  apiUrl: string;
  apiKey?: string;
  jwtToken?: string;
  defaultProject?: string;
  outputFormat?: string;
}

interface McpMessage {
  jsonrpc: '2.0';
  id?: string | number;
  method?: string;
  params?: any;
  result?: any;
  error?: any;
}

interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export function createMcpCommand(): Command {
  const mcp = new Command('mcp');
  mcp.description('Start MCP server (for Claude Desktop integration)');

  mcp.action(async () => {
    try {
      const config = await loadConfig();

      if (!config.apiUrl) {
        console.error('Error: API URL not configured. Run: msgcore config set apiUrl <url>');
        process.exit(1);
      }

      if (!config.apiKey) {
        console.error('Error: API key not configured. Run: msgcore config set apiKey <key>');
        process.exit(1);
      }

      const client = axios.create({
        baseURL: config.apiUrl,
        headers: {
          'X-API-Key': config.apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
      });

      const server = new McpStdioServer(client, config);
      await server.start();
    } catch (error) {
      console.error(`Failed to start MCP server: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

  return mcp;
}

class McpStdioServer {
  private client: AxiosInstance;
  private config: CLIConfig;
  private rl: readline.Interface;
  private tools: McpTool[] = [];
  private contractMap: Map<string, typeof CONTRACTS[0]> = new Map();
  private pendingWork = 0;
  private shouldExit = false;
  private userPermissions: string[] = [];
  private permissionsFetched = false;

  constructor(client: AxiosInstance, config: CLIConfig) {
    this.client = client;
    this.config = config;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });
    this.loadContracts();
  }

  private loadContracts(): void {
    for (const contract of CONTRACTS) {
      // Skip contracts that are excluded from MCP
      if (contract.contractMetadata.excludeFromMcp) {
        continue;
      }

      const toolName = `msgcore_${contract.contractMetadata.command.replace(/\s+/g, '_')}`;
      this.tools.push(this.contractToTool(contract));
      this.contractMap.set(toolName, contract);
    }
  }

  private async fetchUserPermissions(): Promise<void> {
    if (this.permissionsFetched) return;

    try {
      const response = await this.client.get('/api/v1/auth/whoami');
      this.userPermissions = response.data.permissions || [];
      this.permissionsFetched = true;
    } catch (error) {
      this.permissionsFetched = true;
      // Log to stderr so it doesn't interfere with JSON-RPC stdout
      console.error('Warning: Failed to fetch permissions. Some tools may be unavailable.', error instanceof Error ? error.message : String(error));
      this.userPermissions = [];
    }
  }

  private hasRequiredScopes(contract: typeof CONTRACTS[0]): boolean {
    const requiredScopes = contract.contractMetadata.requiredScopes || [];
    if (requiredScopes.length === 0) return true;
    return requiredScopes.every((scope: string) => this.userPermissions.includes(scope));
  }

  private getFilteredTools(): McpTool[] {
    return this.tools.filter((tool) => {
      const contract = this.contractMap.get(tool.name);
      return contract && this.hasRequiredScopes(contract);
    });
  }

  private contractToTool(contract: typeof CONTRACTS[0]): McpTool {
    const inputSchema: {
      type: 'object';
      properties: Record<string, any>;
      required?: string[];
    } = { type: 'object', properties: {} };
    const required: string[] = [];

    const pathParams = contract.path.match(/:(\w+)/g);
    if (pathParams) {
      for (const param of pathParams) {
        const paramName = param.substring(1);
        // Skip project parameter - it's auto-filled from config
        if (paramName === 'project') continue;
        inputSchema.properties[paramName] = {
          type: 'string',
          description: `${paramName.charAt(0).toUpperCase() + paramName.slice(1)} identifier`,
        };
        required.push(paramName);
      }
    }

    if (contract.contractMetadata.options) {
      for (const [key, option] of Object.entries(contract.contractMetadata.options)) {
        const opt = option as { type: string; description?: string; choices?: any[]; default?: any; required?: boolean };
        const property: { type?: string; description: string; enum?: any[]; default?: any } = { description: opt.description || '' };

        switch (opt.type) {
          case 'string':
          case 'target_pattern':
          case 'targets_pattern':
            property.type = 'string';
            break;
          case 'number':
            property.type = 'number';
            break;
          case 'boolean':
            property.type = 'boolean';
            break;
          case 'array':
            property.type = 'array';
            break;
          case 'object':
            property.type = 'object';
            break;
          default:
            property.type = 'string';
        }

        if (opt.choices) property.enum = opt.choices;
        if (opt.default !== undefined) property.default = opt.default;

        inputSchema.properties[key] = property;
        if (opt.required) required.push(key);
      }
    }

    if (required.length > 0) {
      // Deduplicate required array for JSON Schema 2020-12 compliance
      inputSchema.required = [...new Set(required)];
    }

    return {
      name: `msgcore_${contract.contractMetadata.command.replace(/\s+/g, '_')}`,
      description: contract.contractMetadata.description,
      inputSchema,
    };
  }

  async start(): Promise<void> {
    this.rl.on('line', async (line: string) => {
      this.pendingWork++;
      try {
        const message: McpMessage = JSON.parse(line);
        const response = await this.handleMessage(message);
        this.writeMessage(response);
      } catch (error) {
        this.writeMessage({
          jsonrpc: '2.0',
          id: undefined,
          error: {
            code: -32700,
            message: 'Parse error',
            data: error instanceof Error ? error.message : String(error),
          },
        });
      } finally {
        this.pendingWork--;
        this.maybeExit();
      }
    });

    this.rl.on('close', () => {
      this.shouldExit = true;
      this.maybeExit();
    });
  }

  private maybeExit(): void {
    if (this.shouldExit && this.pendingWork === 0) {
      process.exit(0);
    }
  }

  private async handleMessage(message: McpMessage): Promise<McpMessage> {
    const { method, params, id } = message;

    try {
      switch (method) {
        case 'initialize':
          return this.handleInitialize(id);
        case 'tools/list':
          return await this.handleToolsList(id);
        case 'tools/call':
          return await this.handleToolCall(id, params);
        default:
          return {
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Method not found: ${method}` },
          };
      }
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32603,
          message: 'Internal error',
          data: error instanceof Error ? error.message : String(error),
        },
      };
    }
  }

  private handleInitialize(id: string | number | undefined): McpMessage {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'msgcore-mcp-cli', version: '1.0.2' },
      },
    };
  }

  private async handleToolsList(id: string | number | undefined): Promise<McpMessage> {
    await this.fetchUserPermissions();
    const filteredTools = this.getFilteredTools();
    return { jsonrpc: '2.0', id, result: { tools: filteredTools } };
  }

  private async handleToolCall(id: string | number | undefined, params: any): Promise<McpMessage> {
    try {
      const { name, arguments: args } = params || {};
      if (!name) throw new Error('Missing tool name');

      const contract = this.contractMap.get(name);
      if (!contract) throw new Error(`Unknown tool: ${name}`);

      // Check if user has required permissions for this tool
      await this.fetchUserPermissions();
      if (!this.hasRequiredScopes(contract)) {
        throw new Error('Access denied: insufficient permissions for this tool');
      }

      const convertedArgs = this.convertPatternArgs(args, contract);
      let url = contract.path;
      const usedParams = new Set<string>();

      const pathParams = contract.path.match(/:(\w+)/g);
      if (pathParams) {
        for (const param of pathParams) {
          const paramName = param.substring(1);
          usedParams.add(paramName);

          // Auto-fill project parameter from config
          let value = convertedArgs[paramName];
          if (paramName === 'project' && !value) {
            if (!this.config.defaultProject) {
              throw new Error('Missing project parameter. Set a default project with: msgcore config set defaultProject <project-id>');
            }
            value = this.config.defaultProject;
          }

          if (!value) throw new Error(`Missing required parameter: ${paramName}`);
          url = url.replace(param, value);
        }
      }

      const body: Record<string, any> = {};
      for (const [key, value] of Object.entries(convertedArgs)) {
        if (!usedParams.has(key)) body[key] = value;
      }

      const response = await this.client.request({
        method: contract.httpMethod,
        url,
        data: ['POST', 'PATCH', 'PUT'].includes(contract.httpMethod) ? body : undefined,
        params: contract.httpMethod === 'GET' ? body : undefined,
      });

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }],
          isError: false,
        },
      };
    } catch (error) {
      let errorMessage: string;
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = error instanceof Error ? error.message : String(error);
      }

      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        },
      };
    }
  }

  private parseTargetPattern(pattern: string): { platformId: string; type: string; id: string } {
    const parts = pattern.split(':');
    if (parts.length !== 3) {
      throw new Error(`Invalid target pattern: "${pattern}". Expected format: platformId:type:id`);
    }
    const [platformId, type, id] = parts;
    if (!platformId || !type || !id) {
      throw new Error(`Invalid target pattern: "${pattern}". All parts must be non-empty`);
    }
    return { platformId, type, id };
  }

  private convertPatternArgs(args: Record<string, any>, contract: any): Record<string, any> {
    const converted = { ...args };
    const options = contract.contractMetadata.options || {};

    for (const [key, option] of Object.entries(options)) {
      const value = args[key];
      if (!value || typeof value !== 'string') continue;

      const optionType = (option as any)?.type;

      if (optionType === 'target_pattern') {
        converted.targets = [this.parseTargetPattern(value)];
        delete converted[key];
      }

      if (optionType === 'targets_pattern') {
        converted.targets = value.split(',').map((p: string) => this.parseTargetPattern(p.trim()));
        delete converted[key];
      }
    }

    if (options.text && args.text && !args.content) {
      converted.content = { text: args.text };
      delete converted.text;
    }

    return converted;
  }

  private writeMessage(message: McpMessage): void {
    console.log(JSON.stringify(message));
  }
}
