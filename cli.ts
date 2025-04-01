#!/usr/bin/env node

import { startServer } from "./server.js";

// Display a welcome message
console.log("┌──────────────────────────────────────────┐");
console.log("│       YourAIPhotographer MCP Server      │");
console.log("└──────────────────────────────────────────┘");
console.log("Starting MCP server...");

// Check if API key is set
const apiKey = process.env.YOURAIPHOTOGRAPHER_API_KEY;
if (!apiKey) {
  console.warn(
    "\n⚠️  WARNING: YOURAIPHOTOGRAPHER_API_KEY environment variable is not set."
  );
  console.warn(
    "   To use this tool with Claude, set this variable with your API key:"
  );
  console.warn("   export YOURAIPHOTOGRAPHER_API_KEY=your_api_key_here\n");
}

// Start the MCP server
startServer().catch((error: unknown) => {
  console.error("Failed to start the server:", error);
  process.exit(1);
});
