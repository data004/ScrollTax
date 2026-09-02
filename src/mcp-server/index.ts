import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

// Initialize the ScrollTax MCP Server
const server = new Server(
  {
    name: "scrolltax-tracker-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define the tools exposed by this MCP server
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "trigger_penalty",
        description: "Triggers a financial penalty when a user exceeds their screen time limit on distracting websites.",
        inputSchema: {
          type: "object",
          properties: {
            platform: {
              type: "string",
              description: "The name of the platform where the limit was exceeded (e.g., X, YouTube)",
            },
            limit: {
              type: "number",
              description: "The daily allowed time limit in minutes",
            },
            actual_usage: {
              type: "number",
              description: "The actual time spent on the platform in minutes",
            },
            penalty: {
              type: "number",
              description: "The penalty amount in USDC",
            },
          },
          required: ["platform", "limit", "actual_usage", "penalty"],
        },
      },
    ],
  };
});

// Handle tool execution requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "trigger_penalty") {
    const { platform, limit, actual_usage, penalty } = request.params.arguments as any;
    
    // In a full production environment, this server would read from a local SQLite database
    // populated by the Chrome extension. For the hackathon, we process the incoming trigger.
    
    const overage = actual_usage - limit;
    
    if (overage <= 0) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              status: "ignored",
              message: "User is within allowed limits.",
            }),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            status: "penalty_required",
            platform,
            overage_minutes: overage,
            penalty_amount: penalty,
            message: "User exceeded daily limit. Proceed with financial penalty.",
          }),
        },
      ],
    };
  }
  
  throw new Error("Tool not found");
});

// Start the stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ScrollTax MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error starting MCP server:", error);
  process.exit(1);
});
