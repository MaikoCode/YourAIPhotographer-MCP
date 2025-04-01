import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import open from "open";

// Create and configure an MCP server
export function createServer() {
  // Initialize the MCP server
  const server = new McpServer({
    name: "YourAIPhotographer",
    version: "1.0.0",
  });

  // Define the schema for the generateImage tool parameters
  const generateImageSchema = z.object({
    modelName: z
      .string()
      .describe("The name of the model to use for image generation"),
    prompt: z.string().describe("The prompt describing the image to generate"),
    output_format: z
      .string()
      .optional()
      .default("png")
      .describe("Image format: 'png' or 'jpg' (defaults to 'png')"),
    aspect_ratio: z
      .string()
      .optional()
      .default("1:1")
      .describe(
        "Aspect ratio: '1:1', '16:9', '4:3', '9:16', etc. (defaults to '1:1')"
      ),
  });

  // Define the generateImage tool
  server.tool(
    "generate-custom-image",
    "Generate custom images with your models on YourAIPhotographer",
    generateImageSchema.shape,
    async (params, extra) => {
      const { modelName, prompt, output_format, aspect_ratio } = params;
      // Retrieve the API key from environment variables
      const apiKey = process.env.YOURAIPHOTOGRAPHER_API_KEY;
      if (!apiKey) {
        throw new Error(
          "API key not set. Please set the YOURAIPHOTOGRAPHER_API_KEY environment variable."
        );
      }

      try {
        // Make the POST request to YourAIPhotographer API
        const response = await axios.post(
          "https://youraiphotographer.com/api/v1/generate-image",
          {
            modelName,
            prompt,
            output_format,
            aspect_ratio,
          },
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the API call was successful
        if (response.data.success) {
          const url = response.data.url;
          // Open the image URL in the default browser
          await open(url);
          return {
            content: [
              {
                type: "text",
                text: `Image generated and opened in browser: ${url}`,
              },
            ],
          };
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        // Handle Axios-specific errors with detailed messages
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          let message = "Unknown error";
          switch (status) {
            case 401:
              message = "Invalid or missing API key";
              break;
            case 402:
              message = "Insufficient credits";
              break;
            case 404:
              message = "Model not found or not trained";
              break;
            case 400:
              message = "Missing required parameters";
              break;
            case 500:
              message = "Server error";
              break;
            default:
              message = error.message;
          }
          throw new Error(`API error: ${status} - ${message}`);
        }
        throw error; // Rethrow non-Axios errors
      }
    }
  );

  return server;
}

// Function to start the server
export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  return server;
}

// Run the server if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer().catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });
}
