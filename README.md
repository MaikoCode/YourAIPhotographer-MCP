# YourAIPhotographer MCP Server

Integrates with [YourAIPhotographer](https://youraiphotographer.com) to enable MCP clients (e.g., Claude Desktop) to generate custom images using your trained models.

## Installation

```bash
npm install -g youraiphotographer-mcp
```

Requires Node.js 16.x+.

## Configuration

1. Obtain an API key from [YourAIPhotographer API Keys](https://youraiphotographer.com/api-keys).
2. Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "YourAIPhotographer": {
      "command": "youraiphotographer-mcp",
      "env": {
        "YOURAIPHOTOGRAPHER_API_KEY": "<API-KEY>"
      }
    }
  }
}
```

Replace `<API-KEY>` with your key. Restart Claude Desktop.

## Usage

### Using with Claude

Once running, use the `generate-custom-image` tool in Claude with these parameters:

- `modelName`: Name of the model for image generation.
- `prompt`: Description of the desired image.
- `output_format` (optional): `'png'` or `'jpg'` (defaults to `'png'`).
- `aspect_ratio` (optional): `'1:1'`, `'16:9'`, `'4:3'`, `'9:16'`, etc. (defaults to `'1:1'`).

**Example Prompt**:  
"Generate me a custom image with the model `<name-of-your-model>` with the prompt: headshot of model, sitting at a desk, at a (office), shirt and tie and suit pants"

## License

MIT
