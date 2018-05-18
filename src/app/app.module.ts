import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { DialogueEditorComponent } from './dialogue-editor/dialogue-editor.component';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  onMonacoLoad: () => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      schemas: [{
        uri: 'triggerSchema.json',
        fileMatch: ['trigger.json'],
        schema: GetTriggerSchema()
      },
      {
        uri: 'nodesSchema.json',
        fileMatch: ['nodes.json'],
        schema: GetNodesSchema()
      },
      {
        uri: 'modelSchema.json',
        fileMatch: ['model.json'],
        schema: GetModelSchema()
      },
      {
        uri: 'entitiesSchema.json',
        fileMatch: ['entities.json'],
        schema: GetEntitiesSchema()
      }],
      allowComments: false
    });
  }
};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DialogueEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

function GetModelSchema(): any {
  return {
    "$ref": "#/definitions/patterns/propertiesObject",
    "definitions": GetSchemaDefinitions()
  }
}

function GetEntitiesSchema(): any {
  return {
    "$ref": "#/definitions/patterns/propertiesObject",
    "definitions": GetSchemaDefinitions()
  }
}

function GetTriggerSchema(): any {
  const triggerSchema = {
    "oneOf": [
      {
        "$ref": "#/definitions/triggers/attachmentTrigger"
      },
      {
        "$ref": "#/definitions/triggers/customEventTrigger"
      },
      {
        "$ref": "#/definitions/triggers/dialogueTrigger"
      },
      {
        "$ref": "#/definitions/triggers/eventTrigger"
      },
      {
        "$ref": "#/definitions/triggers/intentTrigger"
      },
      {
        "$ref": "#/definitions/triggers/messageTrigger"
      }
    ],
    "definitions": { }
  };

  triggerSchema.definitions = GetSchemaDefinitions();

  return triggerSchema
}

function GetNodesSchema(): any {
  const nodeSchema = {
      "type": "array",
      "minItems": 1,
      "items": {
        "anyOf": [
          {
            "$ref": "#/definitions/nodes/actionNode"
          },
          {
            "$ref": "#/definitions/nodes/attachmentPromptNode"
          },
          {
            "$ref": "#/definitions/nodes/cardCollectionNode"
          },
          {
            "$ref": "#/definitions/nodes/cardNode"
          },
          {
            "$ref": "#/definitions/nodes/choicePromptNode"
          },
          {
            "$ref": "#/definitions/nodes/confirmationPromptNode"
          },
          {
            "$ref": "#/definitions/nodes/customCardCollectionNode"
          },
          {
            "$ref": "#/definitions/nodes/customEventNode"
          },
          {
            "$ref": "#/definitions/nodes/decisionNode"
          },
          {
            "$ref": "#/definitions/nodes/dialogueNode"
          },
          {
            "$ref": "#/definitions/nodes/downloadActionNode"
          },
          {
            "$ref": "#/definitions/nodes/eventNode"
          },
          {
            "$ref": "#/definitions/nodes/messageNode"
          },
          {
            "$ref": "#/definitions/nodes/operationNode"
          },
          {
            "$ref": "#/definitions/nodes/repeatDialogueNode"
          },
          {
            "$ref": "#/definitions/nodes/sequenceDialogueNode"
          },
          {
            "$ref": "#/definitions/nodes/simplePromptNode"
          }
        ]
    },
    "definitions": { }
  }

  nodeSchema.definitions = GetSchemaDefinitions();
  
  return nodeSchema;
}

function GetSchemaDefinitions(): any {
  return {
    "cardContent": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string"
        },
        "title": {
          "$ref": "#/definitions/outputShort"
        },
        "subtitle": {
          "$ref": "#/definitions/outputShort"
        },
        "text": {
          "$ref": "#/definitions/outputLong"
        },
        "image": {
          "$ref": "#/definitions/outputLong"
        },
        "isThumbnail": {
          "$ref": "#/definitions/typeBoolean"
        },
        "retryMessage": {
          "$ref": "#/definitions/outputShort"
        },
        "tapOptions": {
          "type": "object",
          "properties": {
            "displayName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "value": {
              "$ref": "#/definitions/outputShort"
            }
          },
          "additionalProperties": false,
          "required": [
            "displayName",
            "output",
            "value"
          ]
        },
        "buttonOptions": {
          "type": "object",
          "properties": {
            "listName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "displayName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            }
          },
          "additionalProperties": false,
          "required": [
            "listName",
            "output"
          ]
        }
      },
      "anyOf": [
        { "required": ["title"] },
        { "required": ["subtitle"] },
        { "required": ["text"] },
        { "required": ["image"] },
        { "required": ["tapOptions"] },
        { "required": ["buttonOptions"] }
      ],
      "additionalProperties": false
    },
    "contextDataProperty": {
      "anyOf": [
        {
          "$ref": "#/definitions/patterns/propertyReference"
        },
        {
          "type": "string",
          "pattern": "^\\/*Bot\\/[a-zA-Z0-9]{1,128}$"
        },
        {
          "type": "string",
          "pattern": "^\\/*Dialogue\\/LastApiStatusCode$"
        },
        {
          "type": "string",
          "pattern": "^\\/*Language\\/[a-zA-Z0-9]{1,128}$"
        }
      ]
    },
    "dialogueId": {
      "type": "string",
      "minLength": 1
    },
    "json": {
      "type": "object"
    },
    "mimeTypes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "outputShort": {
      "type": "string",
      "minLength": 1,
      "maxLength": 320
    },
    "outputLong": {
      "type": "string",
      "minLength": 1
    },
    "languageReference": {
      "type": "object",
      "properties": {
        "var": {
          "type": "string",
          "pattern": "^\\/*Language\\/[a-zA-Z0-9]{1,128}$"
        }
      },
      "additionalProperties": false,
      "required": [
        "var"
      ]
    },
    "nodeCustomContent": {
      "type": "object",
      "properties": {
        "contentType": {
          "type": "string"
        },
        "content": {
          "$ref": "#/definitions/json"
        }
      },
      "additionalProperties": false,
      "required": [
        "contentType",
        "content"
      ]
    },
    "patterns": {
      "alphanumeric": {
        "type": "string",
        "pattern": "^[a-zA-Z0-9]{1,128}$"
      },
      "dialogueNodeInputPropertiesObject": {
        "type": "object",
        "patternProperties": {
          "^[a-zA-Z0-9]{1,128}$": {
            "$ref": "#/definitions/jsonLogic"
          }
        },
        "additionalProperties": false
      },
      "dialogueNodeOutputPropertiesObject": {
        "type": "object",
        "patternProperties": {
          "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$": {
            "$ref": "#/definitions/logicData"
          }
        },
        "additionalProperties": false
      },
      "propertyReference": {
        "type": "string",
        "pattern": "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$"
      },
      "propertyReferenceBlob": {
        "type": "string",
        "pattern": "^(\\/*conversation\\/+)?[^\\/]+$"
      },
      "propertiesObject": {
        "type": "object",
        "patternProperties": {
          "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$": {
            "$ref": "#/definitions/propertiesObjectValue"
          }
        },
        "additionalProperties": false
      }
    },
    "propertiesObjectValue": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1
        }
      ]
    },
    "triggers": {
      "attachmentTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["attachment"]
          },
          "contentTypes": {
            "$ref": "#/definitions/mimeTypes"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReferenceBlob"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "contentTypes",
          "output"
        ]
      },
      "customEventTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["customEvent"]
          },
          "name": {
            "type": "string"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "name"
        ]
      },
      "dialogueTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["nestedDialogue"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type"
        ]
      },
      "eventTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["event"]
          },
          "event": {
            "type": "string",
            "enum": [
              "conversationStart",
              "help"
            ]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "event"
        ]
      },
      "intentTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["intent"]
          },
          "intent": {
            "type": "string"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "intent"
        ]
      },
      "messageTrigger": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["message"]
          },
          "values": {
            "type": "array",
            "items": {
              "anyOf": [
                {
                  "$ref": "#/definitions/outputShort"
                },
                {
                  "$ref": "#/definitions/languageReference"
                }
              ]
            }
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "values"
        ]
      }
    },
    "nodes": {
      "actionNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["action"]
          },
          "service": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string"
              },
              "headers": {
                "type": "object",
                "patternProperties": {
                  ".+": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              },
              "method": {
                "type": "string",
                "enum": ["GET", "PUT", "POST", "DELETE"]
              },
              "body": {
                "$ref": "#/definitions/json"
              }
            },
            "additionalProperties": false,
            "required": [
              "url",
              "method"
            ]
          },
          "outputs": {
            "type": "object",
            "properties": {
              "body": {
                "$ref": "#/definitions/patterns/propertiesObject"
              },
              "header": {
                "$ref": "#/definitions/patterns/propertiesObject"
              }
            },
            "additionalProperties": false
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "service",
          "nextNodeIndex"
        ]
      },
      "attachmentPromptNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["attachmentPrompt"]
          },
          "contentTypes": {
            "$ref": "#/definitions/mimeTypes"
          },
          "message": {
            "$ref": "#/definitions/outputShort"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "customContent": {
            "$ref": "#/definitions/nodeCustomContent"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReferenceBlob"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "message",
          "retryMessage",
          "output",
          "nextNodeIndex"
        ]
      },
      "cardCollectionNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["cardCollection"]
          },
          "listName": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "contentItem": {
            "$ref": "#/definitions/patterns/alphanumeric"
          },
          "content": {
            "$ref": "#/definitions/cardContent"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          },
          "pageSize": {
            "type": "number"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "listName",
          "contentItem",
          "content",
          "output",
          "nextNodeIndex"
        ]
      },
      "cardNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["card"]
          },
          "content": {
            "$ref": "#/definitions/cardContent"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "content",
          "nextNodeIndex"
        ]
      },
      "choicePromptNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["choicePrompt"]
          },
          "message": {
            "$ref": "#/definitions/outputShort"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "listName": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "displayName": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "message",
          "retryMessage",
          "listName",
          "output",
          "nextNodeIndex"
        ]
      },
      "confirmationPromptNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["confirmationPrompt"]
          },
          "message": {
            "$ref": "#/definitions/outputShort"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "positiveMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "negativeMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "message",
          "retryMessage",
          "output",
          "nextNodeIndex"
        ]
      },
      "customCardCollectionNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["customCardCollection"]
          },
          "listName": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "contentItem": {
            "$ref": "#/definitions/patterns/alphanumeric"
          },
          "customContent": {
            "$ref": "#/definitions/nodeCustomContent"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "outputOperation": {
            "type": "object",
            "properties": {
              "operation": {
                "$ref": "#/definitions/jsonLogic"
              },
              "output": {
                "$ref": "#/definitions/patterns/propertyReference"
              }
            },
            "additionalProperties": false,
            "required": [
              "operation",
              "output"
            ]
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          },
          "pageSize": {
            "type": "number"
          },
          "validation": {
            "$ref": "#/definitions/jsonLogic"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "listName",
          "contentItem",
          "customContent",
          "output",
          "nextNodeIndex"
        ]
      },
      "customEventNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["customEvent"]
          },
          "name": {
            "type": "string"
          },
          "data": {
            "$ref": "#/definitions/logicData"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "name"
        ]
      },
      "decisionNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["decision"]
          },
          "rule": {
            "$ref": "#/definitions/jsonLogic"
          },
          "passNodeIndex": {
            "type": ["number", "null"]
          },
          "failNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "rule",
          "passNodeIndex",
          "failNodeIndex"
        ]
      },
      "dialogueNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["dialogue"]
          },
          "dialogueId": {
            "$ref": "#/definitions/dialogueId"
          },
          "inputs": {
            "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
          },
          "outputs": {
            "$ref": "#/definitions/patterns/dialogueNodeOutputPropertiesObject"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "dialogueId",
          "nextNodeIndex"
        ]
      },
      "downloadActionNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["downloadAction"]
          },
          "service": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string"
              },
              "headers": {
                "type": "object",
                "patternProperties": {
                  ".+": {
                    "type": "string"
                  }
                },
                "additionalProperties": false
              }
            },
            "additionalProperties": false,
            "required": [
              "url"
            ]
          },
          "outputs": {
            "type": "object",
            "properties": {
              "content": {
                "$ref": "#/definitions/patterns/propertyReferenceBlob"
              },
              "header": {
                "$ref": "#/definitions/patterns/propertiesObject"
              }
            },
            "additionalProperties": false
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "service",
          "nextNodeIndex"
        ]
      },
      "eventNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["event"]
          },
          "event": {
            "type": "string",
            "enum": ["leaveConversation", "resetDialogue", "endDialogue", "resetAuthentication"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "event"
        ]
      },
      "messageNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["message"]
          },
          "message": {
            "$ref": "#/definitions/outputShort"
          },
          "customContent": {
            "$ref": "#/definitions/nodeCustomContent"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "message",
          "nextNodeIndex"
        ]
      },
      "operationNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["operation"]
          },
          "operation": {
            "$ref": "#/definitions/jsonLogic"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "operation",
          "output",
          "nextNodeIndex"
        ]
      },
      "repeatDialogueNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["repeatDialogue"]
          },
          "dialogueId": {
            "$ref": "#/definitions/dialogueId"
          },
          "inputs": {
            "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
          },
          "outputs": {
            "$ref": "#/definitions/patterns/dialogueNodeOutputPropertiesObject"
          },
          "repeatUntil": {
            "$ref": "#/definitions/jsonLogic"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "dialogueId",
          "inputs",
          "nextNodeIndex",
          "outputs",
          "repeatUntil"
        ]
      },
      "sequenceDialogueNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["sequenceDialogue"]
          },
          "dialogueId": {
            "$ref": "#/definitions/dialogueId"
          },
          "inputItem": {
            "$ref": "#/definitions/patterns/alphanumeric"
          },
          "inputs": {
            "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
          },
          "listName": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "dialogueId",
          "inputItem",
          "listName",
          "nextNodeIndex"
        ]
      },
      "simplePromptNode": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": ["datePrompt", "dateTimePrompt", "numberPrompt", "stringPrompt", "timePrompt"]
          },
          "message": {
            "$ref": "#/definitions/outputShort"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "customContent": {
            "$ref": "#/definitions/nodeCustomContent"
          },
          "output": {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          "nextNodeIndex": {
            "type": ["number", "null"]
          },
          "validation": {
            "$ref": "#/definitions/jsonLogic"
          }
        },
        "additionalProperties": false,
        "required": [
          "type",
          "message",
          "retryMessage",
          "output",
          "nextNodeIndex"
        ]
      }
    },
    "logicData": {
      "type": "object",
      "properties": {
        "var": {
          "$ref": "#/definitions/contextDataProperty"
        }
      },
      "additionalProperties": false,
      "required": [
        "var"
      ]
    },
    "logicAnyUnary": {
      "oneOf": [
        {
          "type": "array",
          "maxItems": 1,
          "minItems": 1,
          "items": {
            "$ref": "#/definitions/jsonLogic"
          }
        },
        {
          "$ref": "#/definitions/jsonLogic"
        }
      ]
    },
    "logicAny": {
      "type": "array",
      "maxItems": 2,
      "minItems": 2,
      "items": {
        "$ref": "#/definitions/jsonLogic"
      }
    },
    "logicDate": {
      "type": "array",
      "maxItems": 2,
      "minItems": 2,
      "items": {
        "$ref": "#/definitions/typeDate"
      }
    },
    "logicDateTime": {
      "type": "array",
      "maxItems": 2,
      "minItems": 2,
      "items": {
        "$ref": "#/definitions/typeDateTime"
      }
    },
    "logicNumeric": {
      "type": "array",
      "maxItems": 2,
      "minItems": 2,
      "items": {
        "$ref": "#/definitions/typeNumeric"
      }
    },
    "logicSize": {
      "anyOf": [
        { "$ref": "#/definitions/logicDate" },
        { "$ref": "#/definitions/logicDateTime" },
        { "$ref": "#/definitions/logicNumeric" },
        { "$ref": "#/definitions/logicTime" }
      ]
    },
    "logicTime": {
      "type": "array",
      "maxItems": 2,
      "minItems": 2,
      "items": {
        "$ref": "#/definitions/typeTime"
      }
    },
    "jsonLogic": {
      "anyOf": [
        {
          "$ref": "#/definitions/typeAny"
        },
        {
          "$ref": "#/definitions/typeBoolean"
        },
        {
          "$ref": "#/definitions/typeDate"
        },
        {
          "$ref": "#/definitions/typeDateTime"
        },
        {
          "$ref": "#/definitions/typeList"
        },
        {
          "$ref": "#/definitions/typeNumeric"
        },
        {
          "$ref": "#/definitions/typeString"
        },
        {
          "$ref": "#/definitions/typeTime"
        },
        {
          "type": "null"
        }
      ]
    },
    "typeAny": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["getItem"]
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeNumeric"
                    }
                  ],
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "if": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/jsonLogic"
              },
              "minItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "if"
          ]
        },
        {
          "type": "object",
          "properties": {
            "current": {
              "type": "string"
            }
          },
          "additionalProperties": false,
          "required": [
            "current"
          ]
        },
        {
          "$ref": "#/definitions/logicData"
        }
      ]
    },
    "typeBoolean": {
      "oneOf": [
        {
          "type": "boolean"
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "type": "string",
                  "enum": ["matchesPattern"]
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/typeString"
                  },
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "===": {
              "$ref": "#/definitions/logicAny"
            }
          },
          "additionalProperties": false,
          "required": [
            "==="
          ]
        },
        {
          "type": "object",
          "properties": {
            "==": {
              "$ref": "#/definitions/logicAny"
            }
          },
          "additionalProperties": false,
          "required": [
            "=="
          ]
        },
        {
          "type": "object",
          "properties": {
            "!==": {
              "$ref": "#/definitions/logicAny"
            }
          },
          "additionalProperties": false,
          "required": [
            "!=="
          ]
        },
        {
          "type": "object",
          "properties": {
            "!=": {
              "$ref": "#/definitions/logicAny"
            }
          },
          "additionalProperties": false,
          "required": [
            "!="
          ]
        },
        {
          "type": "object",
          "properties": {
            "and": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/jsonLogic"
              },
              "minItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "and"
          ]
        },
        {
          "type": "object",
          "properties": {
            "or": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/jsonLogic"
              },
              "minItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "or"
          ]
        },
        {
          "type": "object",
          "properties": {
            "!": {
              "$ref": "#/definitions/logicAnyUnary"
            }
          },
          "additionalProperties": false,
          "required": [
            "!"
          ]
        },
        {
          "type": "object",
          "properties": {
            "!!": {
              "$ref": "#/definitions/logicAnyUnary"
            }
          },
          "additionalProperties": false,
          "required": [
            "!!"
          ]
        },
        {
          "type": "object",
          "properties": {
            ">": {
              "$ref": "#/definitions/logicSize"
            }
          },
          "additionalProperties": false,
          "required": [
            ">"
          ]
        },
        {
          "type": "object",
          "properties": {
            ">=": {
              "$ref": "#/definitions/logicSize"
            }
          },
          "additionalProperties": false,
          "required": [
            ">="
          ]
        },
        {
          "type": "object",
          "properties": {
            "<": {
              "$ref": "#/definitions/logicSize"
            }
          },
          "additionalProperties": false,
          "required": [
            "<"
          ]
        },
        {
          "type": "object",
          "properties": {
            "<=": {
              "$ref": "#/definitions/logicSize"
            }
          },
          "additionalProperties": false,
          "required": [
            "<="
          ]
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeDate": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeDate"
                },
                {
                  "type": "string",
                  "pattern": "^(add|subtract)(Days|Weeks|Months|Years)$"
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/typeNumeric"
                  },
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "Date.currentDate": {
              "type": "array",
              "maxItems": 0
            }
          },
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "Date.fromUTC": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "$ref": "#/definitions/typeString"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeDateTime": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeDateTime"
                },
                {
                  "type": "string",
                  "pattern": "^(add|subtract)(Seconds|Minutes|Hours|Days|Weeks|Months|Years)$"
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/typeNumeric"
                  },
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "DateTime.currentDateTime": {
              "type": "array",
              "maxItems": 0
            }
          },
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "DateTime.fromUTC": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "$ref": "#/definitions/typeString"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeList": {
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["addItem"]
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/jsonLogic"
                  },
                  "minItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["filter"]
                },
                {
                  "oneOf": [
                    {
                      "type": "array",
                      "items": [
                        {
                          "type": "string"
                        },
                        {
                          "$ref": "#/definitions/jsonLogic"
                        }
                      ],
                      "minItems": 2,
                      "maxItems": 2
                    },
                    {
                      "type": "array",
                      "items": {
                        "$ref": "#/definitions/jsonLogic"
                      },
                      "minItems": 1,
                      "maxItems": 1
                    }
                  ]
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "type": "string",
                  "enum": ["split"]
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeString"
                    }
                  ],
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["sort"]
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/jsonLogic"
                  }
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["removeItem"]
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeNumeric"
                    }
                  ],
                  "minItems": 0,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeList"
                },
                {
                  "type": "string",
                  "enum": ["updateItem"]
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeNumeric"
                    },
                    {
                      "$ref": "#/definitions/jsonLogic"
                    }
                  ],
                  "minItems": 2,
                  "maxItems": 2
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeNumeric": {
      "oneOf": [
        {
          "type": "number"
        },
        {
          "type": "object",
          "patternProperties": {
            "^[\\+\\-]$": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeNumeric"
                }
              ],
              "minItems": 1
            }
          },
          "additionalProperties": false,
          "minProperties": 1,
          "maxProperties": 1
        },
        {
          "type": "object",
          "properties": {
            "*": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeNumeric"
                }
              ],
              "minItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "*"
          ]
        },
        {
          "type": "object",
          "patternProperties": {
            "^[\\/\\%]$": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeNumeric"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false,
          "minProperties": 1,
          "maxProperties": 1
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/logicData"
                },
                {
                  "type": "string",
                  "enum": ["getCount"]
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "type": "string",
                  "enum": ["indexOf"]
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeString"
                    },
                    {
                      "$ref": "#/definitions/typeNumeric"
                    }
                  ],
                  "minItems": 1,
                  "maxItems": 2
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "type": "string",
                  "enum": ["length"]
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "patternProperties": {
            "^Date[.]current(Year|Month|Day)$": {
              "type": "array",
              "maxItems": 0
            }
          },
          "additionalProperties": false,
          "minProperties": 1,
          "maxProperties": 1
        },
        {
          "type": "object",
          "patternProperties": {
            "^Time[.]current(Hour|Minute|Second)$": {
              "type": "array",
              "maxItems": 0
            }
          },
          "additionalProperties": false,
          "minProperties": 1,
          "maxProperties": 1
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeNumeric"
                },
                {
                  "type": "string",
                  "enum": ["round"]
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/typeNumeric"
                  },
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeString": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "object",
          "properties": {
            "cat": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/jsonLogic"
              },
              "minItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "cat"
          ]
        },
        {
          "type": "object",
          "properties": {
            "substr": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "$ref": "#/definitions/typeNumeric"
                }
              ],
              "minItems": 2,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "substr"
          ]
        },
        {
          "type": "object",
          "properties": {
            "Date.format": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeDate"
                },
                {
                  "type": "string",
                  "pattern": "^[yMdot\\s-/]+$"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "Date.format"
          ]
        },
        {
          "type": "object",
          "properties": {
            "DateTime.toUTC": {
              "oneOf": [
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeDate"
                    },
                    {
                      "$ref": "#/definitions/typeTime"
                    },
                    {
                      "$ref": "#/definitions/typeString"
                    }
                  ],
                  "minItems": 3,
                  "maxItems": 3
                },
                {
                  "type": "array",
                  "items": [
                    {
                      "$ref": "#/definitions/typeDateTime"
                    },
                    {
                      "$ref": "#/definitions/typeString"
                    }
                  ],
                  "minItems": 2,
                  "maxItems": 2
                }
              ]
            }
          },
          "additionalProperties": false,
          "required": [
            "DateTime.toUTC"
          ]
        },
        {
          "type": "object",
          "properties": {
            "DateTime.format": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeDateTime"
                },
                {
                  "type": "string",
                  "pattern": "^[yMdotHhms\\s-/:]+$"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false,
          "required": [
            "DateTime.format"
          ]
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    },
    "typeTime": {
      "oneOf": [
        {
          "type": "string"
        },
        {
          "type": "object",
          "properties": {
            "method": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeTime"
                },
                {
                  "type": "string",
                  "pattern": "^(add|subtract)(Seconds|Minutes|Hours)$"
                },
                {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/typeNumeric"
                  },
                  "minItems": 1,
                  "maxItems": 1
                }
              ],
              "minItems": 3,
              "maxItems": 3
            }
          },
          "additionalProperties": false,
          "required": [
            "method"
          ]
        },
        {
          "type": "object",
          "properties": {
            "Time.currentTime": {
              "type": "array",
              "maxItems": 0
            }
          },
          "additionalProperties": false
        },
        {
          "type": "object",
          "properties": {
            "Time.fromUTC": {
              "type": "array",
              "items": [
                {
                  "$ref": "#/definitions/typeString"
                },
                {
                  "$ref": "#/definitions/typeString"
                }
              ],
              "minItems": 2,
              "maxItems": 2
            }
          },
          "additionalProperties": false
        },
        {
          "$ref": "#/definitions/typeAny"
        }
      ]
    }
  }
}


function GetFullSchema(): any {
  return {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "MidlandHR People First Bot Dialogue Schema",
    "description": "This is a schema that defines the format for bot dialogue templates",
    "type": "object",
    "properties": {
      "trigger": {
        "oneOf": [
          {
            "$ref": "#/definitions/triggers/attachmentTrigger"
          },
          {
            "$ref": "#/definitions/triggers/customEventTrigger"
          },
          {
            "$ref": "#/definitions/triggers/dialogueTrigger"
          },
          {
            "$ref": "#/definitions/triggers/eventTrigger"
          },
          {
            "$ref": "#/definitions/triggers/intentTrigger"
          },
          {
            "$ref": "#/definitions/triggers/messageTrigger"
          }
        ]
      },
      "nodes": {
        "type": "array",
        "minItems": 1,
        "items": {
          "anyOf": [
            {
              "$ref": "#/definitions/nodes/actionNode"
            },
            {
              "$ref": "#/definitions/nodes/attachmentPromptNode"
            },
            {
              "$ref": "#/definitions/nodes/cardCollectionNode"
            },
            {
              "$ref": "#/definitions/nodes/cardNode"
            },
            {
              "$ref": "#/definitions/nodes/choicePromptNode"
            },
            {
              "$ref": "#/definitions/nodes/confirmationPromptNode"
            },
            {
              "$ref": "#/definitions/nodes/customCardCollectionNode"
            },
            {
              "$ref": "#/definitions/nodes/customEventNode"
            },
            {
              "$ref": "#/definitions/nodes/decisionNode"
            },
            {
              "$ref": "#/definitions/nodes/dialogueNode"
            },
            {
              "$ref": "#/definitions/nodes/downloadActionNode"
            },
            {
              "$ref": "#/definitions/nodes/eventNode"
            },
            {
              "$ref": "#/definitions/nodes/messageNode"
            },
            {
              "$ref": "#/definitions/nodes/operationNode"
            },
            {
              "$ref": "#/definitions/nodes/repeatDialogueNode"
            },
            {
              "$ref": "#/definitions/nodes/sequenceDialogueNode"
            },
            {
              "$ref": "#/definitions/nodes/simplePromptNode"
            }
          ]
        }
      },
      "model": {
        "$ref": "#/definitions/patterns/propertiesObject"
      },
      "entities": {
        "$ref": "#/definitions/patterns/propertiesObject"
      },
      "id": {
        "$ref": "#/definitions/dialogueId"
      },
      "background": {
        "type": "boolean"
      }
    },
    "additionalProperties": false,
    "required": [
      "trigger",
      "nodes",
      "id"
    ],
    "definitions": {
      "cardContent": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string"
          },
          "title": {
            "$ref": "#/definitions/outputShort"
          },
          "subtitle": {
            "$ref": "#/definitions/outputShort"
          },
          "text": {
            "$ref": "#/definitions/outputLong"
          },
          "image": {
            "$ref": "#/definitions/outputLong"
          },
          "isThumbnail": {
            "$ref": "#/definitions/typeBoolean"
          },
          "retryMessage": {
            "$ref": "#/definitions/outputShort"
          },
          "tapOptions": {
            "type": "object",
            "properties": {
              "displayName": {
                "$ref": "#/definitions/patterns/propertyReference"
              },
              "output": {
                "$ref": "#/definitions/patterns/propertyReference"
              },
              "value": {
                "$ref": "#/definitions/outputShort"
              }
            },
            "additionalProperties": false,
            "required": [
              "displayName",
              "output",
              "value"
            ]
          },
          "buttonOptions": {
            "type": "object",
            "properties": {
              "listName": {
                "$ref": "#/definitions/patterns/propertyReference"
              },
              "displayName": {
                "$ref": "#/definitions/patterns/propertyReference"
              },
              "output": {
                "$ref": "#/definitions/patterns/propertyReference"
              }
            },
            "additionalProperties": false,
            "required": [
              "listName",
              "output"
            ]
          }
        },
        "anyOf": [
          { "required": ["title"] },
          { "required": ["subtitle"] },
          { "required": ["text"] },
          { "required": ["image"] },
          { "required": ["tapOptions"] },
          { "required": ["buttonOptions"] }
        ],
        "additionalProperties": false
      },
      "contextDataProperty": {
        "anyOf": [
          {
            "$ref": "#/definitions/patterns/propertyReference"
          },
          {
            "type": "string",
            "pattern": "^\\/*Bot\\/[a-zA-Z0-9]{1,128}$"
          },
          {
            "type": "string",
            "pattern": "^\\/*Dialogue\\/LastApiStatusCode$"
          },
          {
            "type": "string",
            "pattern": "^\\/*Language\\/[a-zA-Z0-9]{1,128}$"
          }
        ]
      },
      "dialogueId": {
        "type": "string",
        "minLength": 1
      },
      "json": {
        "type": "object"
      },
      "mimeTypes": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "uniqueItems": true
      },
      "outputShort": {
        "type": "string",
        "minLength": 1,
        "maxLength": 320
      },
      "outputLong": {
        "type": "string",
        "minLength": 1
      },
      "languageReference": {
        "type": "object",
        "properties": {
          "var": {
            "type": "string",
            "pattern": "^\\/*Language\\/[a-zA-Z0-9]{1,128}$"
          }
        },
        "additionalProperties": false,
        "required": [
          "var"
        ]
      },
      "nodeCustomContent": {
        "type": "object",
        "properties": {
          "contentType": {
            "type": "string"
          },
          "content": {
            "$ref": "#/definitions/json"
          }
        },
        "additionalProperties": false,
        "required": [
          "contentType",
          "content"
        ]
      },
      "patterns": {
        "alphanumeric": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9]{1,128}$"
        },
        "dialogueNodeInputPropertiesObject": {
          "type": "object",
          "patternProperties": {
            "^[a-zA-Z0-9]{1,128}$": {
              "$ref": "#/definitions/jsonLogic"
            }
          },
          "additionalProperties": false
        },
        "dialogueNodeOutputPropertiesObject": {
          "type": "object",
          "patternProperties": {
            "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$": {
              "$ref": "#/definitions/logicData"
            }
          },
          "additionalProperties": false
        },
        "propertyReference": {
          "type": "string",
          "pattern": "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$"
        },
        "propertyReferenceBlob": {
          "type": "string",
          "pattern": "^(\\/*conversation\\/+)?[^\\/]+$"
        },
        "propertiesObject": {
          "type": "object",
          "patternProperties": {
            "(?!\\/*(bot\\/+|dialogue\\/+|language\\/+|user\\/+authenticationtoken))^.*$": {
              "$ref": "#/definitions/propertiesObjectValue"
            }
          },
          "additionalProperties": false
        }
      },
      "propertiesObjectValue": {
        "oneOf": [
          {
            "type": "string"
          },
          {
            "type": "array",
            "items": {
              "type": "string"
            },
            "minItems": 1
          }
        ]
      },
      "triggers": {
        "attachmentTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["attachment"]
            },
            "contentTypes": {
              "$ref": "#/definitions/mimeTypes"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReferenceBlob"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "contentTypes",
            "output"
          ]
        },
        "customEventTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["customEvent"]
            },
            "name": {
              "type": "string"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "name"
          ]
        },
        "dialogueTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["nestedDialogue"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type"
          ]
        },
        "eventTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["event"]
            },
            "event": {
              "type": "string",
              "enum": [
                "conversationStart",
                "help"
              ]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "event"
          ]
        },
        "intentTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["intent"]
            },
            "intent": {
              "type": "string"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "intent"
          ]
        },
        "messageTrigger": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["message"]
            },
            "values": {
              "type": "array",
              "items": {
                "anyOf": [
                  {
                    "$ref": "#/definitions/outputShort"
                  },
                  {
                    "$ref": "#/definitions/languageReference"
                  }
                ]
              }
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "values"
          ]
        }
      },
      "nodes": {
        "actionNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["action"]
            },
            "service": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string"
                },
                "headers": {
                  "type": "object",
                  "patternProperties": {
                    ".+": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                },
                "method": {
                  "type": "string",
                  "enum": ["GET", "PUT", "POST", "DELETE"]
                },
                "body": {
                  "$ref": "#/definitions/json"
                }
              },
              "additionalProperties": false,
              "required": [
                "url",
                "method"
              ]
            },
            "outputs": {
              "type": "object",
              "properties": {
                "body": {
                  "$ref": "#/definitions/patterns/propertiesObject"
                },
                "header": {
                  "$ref": "#/definitions/patterns/propertiesObject"
                }
              },
              "additionalProperties": false
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "service",
            "nextNodeIndex"
          ]
        },
        "attachmentPromptNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["attachmentPrompt"]
            },
            "contentTypes": {
              "$ref": "#/definitions/mimeTypes"
            },
            "message": {
              "$ref": "#/definitions/outputShort"
            },
            "retryMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "customContent": {
              "$ref": "#/definitions/nodeCustomContent"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReferenceBlob"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "message",
            "retryMessage",
            "output",
            "nextNodeIndex"
          ]
        },
        "cardCollectionNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["cardCollection"]
            },
            "listName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "contentItem": {
              "$ref": "#/definitions/patterns/alphanumeric"
            },
            "content": {
              "$ref": "#/definitions/cardContent"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            },
            "pageSize": {
              "type": "number"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "listName",
            "contentItem",
            "content",
            "output",
            "nextNodeIndex"
          ]
        },
        "cardNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["card"]
            },
            "content": {
              "$ref": "#/definitions/cardContent"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "content",
            "nextNodeIndex"
          ]
        },
        "choicePromptNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["choicePrompt"]
            },
            "message": {
              "$ref": "#/definitions/outputShort"
            },
            "retryMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "listName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "displayName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "message",
            "retryMessage",
            "listName",
            "output",
            "nextNodeIndex"
          ]
        },
        "confirmationPromptNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["confirmationPrompt"]
            },
            "message": {
              "$ref": "#/definitions/outputShort"
            },
            "retryMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "positiveMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "negativeMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "message",
            "retryMessage",
            "output",
            "nextNodeIndex"
          ]
        },
        "customCardCollectionNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["customCardCollection"]
            },
            "listName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "contentItem": {
              "$ref": "#/definitions/patterns/alphanumeric"
            },
            "customContent": {
              "$ref": "#/definitions/nodeCustomContent"
            },
            "retryMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "outputOperation": {
              "type": "object",
              "properties": {
                "operation": {
                  "$ref": "#/definitions/jsonLogic"
                },
                "output": {
                  "$ref": "#/definitions/patterns/propertyReference"
                }
              },
              "additionalProperties": false,
              "required": [
                "operation",
                "output"
              ]
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            },
            "pageSize": {
              "type": "number"
            },
            "validation": {
              "$ref": "#/definitions/jsonLogic"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "listName",
            "contentItem",
            "customContent",
            "output",
            "nextNodeIndex"
          ]
        },
        "customEventNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["customEvent"]
            },
            "name": {
              "type": "string"
            },
            "data": {
              "$ref": "#/definitions/logicData"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "name"
          ]
        },
        "decisionNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["decision"]
            },
            "rule": {
              "$ref": "#/definitions/jsonLogic"
            },
            "passNodeIndex": {
              "type": ["number", "null"]
            },
            "failNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "rule",
            "passNodeIndex",
            "failNodeIndex"
          ]
        },
        "dialogueNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["dialogue"]
            },
            "dialogueId": {
              "$ref": "#/definitions/dialogueId"
            },
            "inputs": {
              "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
            },
            "outputs": {
              "$ref": "#/definitions/patterns/dialogueNodeOutputPropertiesObject"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "dialogueId",
            "nextNodeIndex"
          ]
        },
        "downloadActionNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["downloadAction"]
            },
            "service": {
              "type": "object",
              "properties": {
                "url": {
                  "type": "string"
                },
                "headers": {
                  "type": "object",
                  "patternProperties": {
                    ".+": {
                      "type": "string"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "additionalProperties": false,
              "required": [
                "url"
              ]
            },
            "outputs": {
              "type": "object",
              "properties": {
                "content": {
                  "$ref": "#/definitions/patterns/propertyReferenceBlob"
                },
                "header": {
                  "$ref": "#/definitions/patterns/propertiesObject"
                }
              },
              "additionalProperties": false
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "service",
            "nextNodeIndex"
          ]
        },
        "eventNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["event"]
            },
            "event": {
              "type": "string",
              "enum": ["leaveConversation", "resetDialogue", "endDialogue", "resetAuthentication"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "event"
          ]
        },
        "messageNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["message"]
            },
            "message": {
              "$ref": "#/definitions/outputShort"
            },
            "customContent": {
              "$ref": "#/definitions/nodeCustomContent"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "message",
            "nextNodeIndex"
          ]
        },
        "operationNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["operation"]
            },
            "operation": {
              "$ref": "#/definitions/jsonLogic"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "operation",
            "output",
            "nextNodeIndex"
          ]
        },
        "repeatDialogueNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["repeatDialogue"]
            },
            "dialogueId": {
              "$ref": "#/definitions/dialogueId"
            },
            "inputs": {
              "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
            },
            "outputs": {
              "$ref": "#/definitions/patterns/dialogueNodeOutputPropertiesObject"
            },
            "repeatUntil": {
              "$ref": "#/definitions/jsonLogic"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "dialogueId",
            "inputs",
            "nextNodeIndex",
            "outputs",
            "repeatUntil"
          ]
        },
        "sequenceDialogueNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["sequenceDialogue"]
            },
            "dialogueId": {
              "$ref": "#/definitions/dialogueId"
            },
            "inputItem": {
              "$ref": "#/definitions/patterns/alphanumeric"
            },
            "inputs": {
              "$ref": "#/definitions/patterns/dialogueNodeInputPropertiesObject"
            },
            "listName": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "dialogueId",
            "inputItem",
            "listName",
            "nextNodeIndex"
          ]
        },
        "simplePromptNode": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["datePrompt", "dateTimePrompt", "numberPrompt", "stringPrompt", "timePrompt"]
            },
            "message": {
              "$ref": "#/definitions/outputShort"
            },
            "retryMessage": {
              "$ref": "#/definitions/outputShort"
            },
            "customContent": {
              "$ref": "#/definitions/nodeCustomContent"
            },
            "output": {
              "$ref": "#/definitions/patterns/propertyReference"
            },
            "nextNodeIndex": {
              "type": ["number", "null"]
            },
            "validation": {
              "$ref": "#/definitions/jsonLogic"
            }
          },
          "additionalProperties": false,
          "required": [
            "type",
            "message",
            "retryMessage",
            "output",
            "nextNodeIndex"
          ]
        }
      },
      "logicData": {
        "type": "object",
        "properties": {
          "var": {
            "$ref": "#/definitions/contextDataProperty"
          }
        },
        "additionalProperties": false,
        "required": [
          "var"
        ]
      },
      "logicAnyUnary": {
        "oneOf": [
          {
            "type": "array",
            "maxItems": 1,
            "minItems": 1,
            "items": {
              "$ref": "#/definitions/jsonLogic"
            }
          },
          {
            "$ref": "#/definitions/jsonLogic"
          }
        ]
      },
      "logicAny": {
        "type": "array",
        "maxItems": 2,
        "minItems": 2,
        "items": {
          "$ref": "#/definitions/jsonLogic"
        }
      },
      "logicDate": {
        "type": "array",
        "maxItems": 2,
        "minItems": 2,
        "items": {
          "$ref": "#/definitions/typeDate"
        }
      },
      "logicDateTime": {
        "type": "array",
        "maxItems": 2,
        "minItems": 2,
        "items": {
          "$ref": "#/definitions/typeDateTime"
        }
      },
      "logicNumeric": {
        "type": "array",
        "maxItems": 2,
        "minItems": 2,
        "items": {
          "$ref": "#/definitions/typeNumeric"
        }
      },
      "logicSize": {
        "anyOf": [
          { "$ref": "#/definitions/logicDate" },
          { "$ref": "#/definitions/logicDateTime" },
          { "$ref": "#/definitions/logicNumeric" },
          { "$ref": "#/definitions/logicTime" }
        ]
      },
      "logicTime": {
        "type": "array",
        "maxItems": 2,
        "minItems": 2,
        "items": {
          "$ref": "#/definitions/typeTime"
        }
      },
      "jsonLogic": {
        "anyOf": [
          {
            "$ref": "#/definitions/typeAny"
          },
          {
            "$ref": "#/definitions/typeBoolean"
          },
          {
            "$ref": "#/definitions/typeDate"
          },
          {
            "$ref": "#/definitions/typeDateTime"
          },
          {
            "$ref": "#/definitions/typeList"
          },
          {
            "$ref": "#/definitions/typeNumeric"
          },
          {
            "$ref": "#/definitions/typeString"
          },
          {
            "$ref": "#/definitions/typeTime"
          },
          {
            "type": "null"
          }
        ]
      },
      "typeAny": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["getItem"]
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeNumeric"
                      }
                    ],
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "if": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/jsonLogic"
                },
                "minItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "if"
            ]
          },
          {
            "type": "object",
            "properties": {
              "current": {
                "type": "string"
              }
            },
            "additionalProperties": false,
            "required": [
              "current"
            ]
          },
          {
            "$ref": "#/definitions/logicData"
          }
        ]
      },
      "typeBoolean": {
        "oneOf": [
          {
            "type": "boolean"
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "type": "string",
                    "enum": ["matchesPattern"]
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/typeString"
                    },
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "===": {
                "$ref": "#/definitions/logicAny"
              }
            },
            "additionalProperties": false,
            "required": [
              "==="
            ]
          },
          {
            "type": "object",
            "properties": {
              "==": {
                "$ref": "#/definitions/logicAny"
              }
            },
            "additionalProperties": false,
            "required": [
              "=="
            ]
          },
          {
            "type": "object",
            "properties": {
              "!==": {
                "$ref": "#/definitions/logicAny"
              }
            },
            "additionalProperties": false,
            "required": [
              "!=="
            ]
          },
          {
            "type": "object",
            "properties": {
              "!=": {
                "$ref": "#/definitions/logicAny"
              }
            },
            "additionalProperties": false,
            "required": [
              "!="
            ]
          },
          {
            "type": "object",
            "properties": {
              "and": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/jsonLogic"
                },
                "minItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "and"
            ]
          },
          {
            "type": "object",
            "properties": {
              "or": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/jsonLogic"
                },
                "minItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "or"
            ]
          },
          {
            "type": "object",
            "properties": {
              "!": {
                "$ref": "#/definitions/logicAnyUnary"
              }
            },
            "additionalProperties": false,
            "required": [
              "!"
            ]
          },
          {
            "type": "object",
            "properties": {
              "!!": {
                "$ref": "#/definitions/logicAnyUnary"
              }
            },
            "additionalProperties": false,
            "required": [
              "!!"
            ]
          },
          {
            "type": "object",
            "properties": {
              ">": {
                "$ref": "#/definitions/logicSize"
              }
            },
            "additionalProperties": false,
            "required": [
              ">"
            ]
          },
          {
            "type": "object",
            "properties": {
              ">=": {
                "$ref": "#/definitions/logicSize"
              }
            },
            "additionalProperties": false,
            "required": [
              ">="
            ]
          },
          {
            "type": "object",
            "properties": {
              "<": {
                "$ref": "#/definitions/logicSize"
              }
            },
            "additionalProperties": false,
            "required": [
              "<"
            ]
          },
          {
            "type": "object",
            "properties": {
              "<=": {
                "$ref": "#/definitions/logicSize"
              }
            },
            "additionalProperties": false,
            "required": [
              "<="
            ]
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeDate": {
        "oneOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeDate"
                  },
                  {
                    "type": "string",
                    "pattern": "^(add|subtract)(Days|Weeks|Months|Years)$"
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/typeNumeric"
                    },
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "Date.currentDate": {
                "type": "array",
                "maxItems": 0
              }
            },
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "Date.fromUTC": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "$ref": "#/definitions/typeString"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeDateTime": {
        "oneOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeDateTime"
                  },
                  {
                    "type": "string",
                    "pattern": "^(add|subtract)(Seconds|Minutes|Hours|Days|Weeks|Months|Years)$"
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/typeNumeric"
                    },
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "DateTime.currentDateTime": {
                "type": "array",
                "maxItems": 0
              }
            },
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "DateTime.fromUTC": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "$ref": "#/definitions/typeString"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeList": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["addItem"]
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/jsonLogic"
                    },
                    "minItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["filter"]
                  },
                  {
                    "oneOf": [
                      {
                        "type": "array",
                        "items": [
                          {
                            "type": "string"
                          },
                          {
                            "$ref": "#/definitions/jsonLogic"
                          }
                        ],
                        "minItems": 2,
                        "maxItems": 2
                      },
                      {
                        "type": "array",
                        "items": {
                          "$ref": "#/definitions/jsonLogic"
                        },
                        "minItems": 1,
                        "maxItems": 1
                      }
                    ]
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "type": "string",
                    "enum": ["split"]
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeString"
                      }
                    ],
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["sort"]
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/jsonLogic"
                    }
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["removeItem"]
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeNumeric"
                      }
                    ],
                    "minItems": 0,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeList"
                  },
                  {
                    "type": "string",
                    "enum": ["updateItem"]
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeNumeric"
                      },
                      {
                        "$ref": "#/definitions/jsonLogic"
                      }
                    ],
                    "minItems": 2,
                    "maxItems": 2
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeNumeric": {
        "oneOf": [
          {
            "type": "number"
          },
          {
            "type": "object",
            "patternProperties": {
              "^[\\+\\-]$": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeNumeric"
                  }
                ],
                "minItems": 1
              }
            },
            "additionalProperties": false,
            "minProperties": 1,
            "maxProperties": 1
          },
          {
            "type": "object",
            "properties": {
              "*": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeNumeric"
                  }
                ],
                "minItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "*"
            ]
          },
          {
            "type": "object",
            "patternProperties": {
              "^[\\/\\%]$": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeNumeric"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false,
            "minProperties": 1,
            "maxProperties": 1
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/logicData"
                  },
                  {
                    "type": "string",
                    "enum": ["getCount"]
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "type": "string",
                    "enum": ["indexOf"]
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeString"
                      },
                      {
                        "$ref": "#/definitions/typeNumeric"
                      }
                    ],
                    "minItems": 1,
                    "maxItems": 2
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "type": "string",
                    "enum": ["length"]
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "patternProperties": {
              "^Date[.]current(Year|Month|Day)$": {
                "type": "array",
                "maxItems": 0
              }
            },
            "additionalProperties": false,
            "minProperties": 1,
            "maxProperties": 1
          },
          {
            "type": "object",
            "patternProperties": {
              "^Time[.]current(Hour|Minute|Second)$": {
                "type": "array",
                "maxItems": 0
              }
            },
            "additionalProperties": false,
            "minProperties": 1,
            "maxProperties": 1
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeNumeric"
                  },
                  {
                    "type": "string",
                    "enum": ["round"]
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/typeNumeric"
                    },
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeString": {
        "oneOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "properties": {
              "cat": {
                "type": "array",
                "items": {
                  "$ref": "#/definitions/jsonLogic"
                },
                "minItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "cat"
            ]
          },
          {
            "type": "object",
            "properties": {
              "substr": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "$ref": "#/definitions/typeNumeric"
                  }
                ],
                "minItems": 2,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "substr"
            ]
          },
          {
            "type": "object",
            "properties": {
              "Date.format": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeDate"
                  },
                  {
                    "type": "string",
                    "pattern": "^[yMdot\\s-/]+$"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "Date.format"
            ]
          },
          {
            "type": "object",
            "properties": {
              "DateTime.toUTC": {
                "oneOf": [
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeDate"
                      },
                      {
                        "$ref": "#/definitions/typeTime"
                      },
                      {
                        "$ref": "#/definitions/typeString"
                      }
                    ],
                    "minItems": 3,
                    "maxItems": 3
                  },
                  {
                    "type": "array",
                    "items": [
                      {
                        "$ref": "#/definitions/typeDateTime"
                      },
                      {
                        "$ref": "#/definitions/typeString"
                      }
                    ],
                    "minItems": 2,
                    "maxItems": 2
                  }
                ]
              }
            },
            "additionalProperties": false,
            "required": [
              "DateTime.toUTC"
            ]
          },
          {
            "type": "object",
            "properties": {
              "DateTime.format": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeDateTime"
                  },
                  {
                    "type": "string",
                    "pattern": "^[yMdotHhms\\s-/:]+$"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false,
            "required": [
              "DateTime.format"
            ]
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      },
      "typeTime": {
        "oneOf": [
          {
            "type": "string"
          },
          {
            "type": "object",
            "properties": {
              "method": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeTime"
                  },
                  {
                    "type": "string",
                    "pattern": "^(add|subtract)(Seconds|Minutes|Hours)$"
                  },
                  {
                    "type": "array",
                    "items": {
                      "$ref": "#/definitions/typeNumeric"
                    },
                    "minItems": 1,
                    "maxItems": 1
                  }
                ],
                "minItems": 3,
                "maxItems": 3
              }
            },
            "additionalProperties": false,
            "required": [
              "method"
            ]
          },
          {
            "type": "object",
            "properties": {
              "Time.currentTime": {
                "type": "array",
                "maxItems": 0
              }
            },
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "Time.fromUTC": {
                "type": "array",
                "items": [
                  {
                    "$ref": "#/definitions/typeString"
                  },
                  {
                    "$ref": "#/definitions/typeString"
                  }
                ],
                "minItems": 2,
                "maxItems": 2
              }
            },
            "additionalProperties": false
          },
          {
            "$ref": "#/definitions/typeAny"
          }
        ]
      }
    }
  }
}
