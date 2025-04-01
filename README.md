# YourAIPhotographer MCP Server

An MCP (Model Context Protocol) server that allows Claude to generate custom images using YourAIPhotographer's API.

## Installation

```bash
npm install -g your-ai-photographer
```

## Usage

### Set up your API key

Before using the tool, you need to set your YourAIPhotographer API key as an environment variable:

```bash
# On Linux/macOS
export YOURAIPHOTOGRAPHER_API_KEY=your_api_key_here

# On Windows (Command Prompt)
set YOURAIPHOTOGRAPHER_API_KEY=your_api_key_here

# On Windows (PowerShell)
$env:YOURAIPHOTOGRAPHER_API_KEY="your_api_key_here"
```

### Start the MCP server

To start the MCP server, run:

```bash
npx your-ai-photographer
```

This will start the MCP server, making it available for Claude to use.

## Using with Claude

Once the MCP server is running, you can use it with Claude by referring to the "generate-custom-image" tool.

Claude can generate images by using this tool with parameters:

- `modelName`: The name of the model to use for image generation
- `prompt`: The prompt describing the image to generate
- `output_format` (optional): Image format - 'png' or 'jpg' (defaults to 'png')
- `aspect_ratio` (optional): Aspect ratio - '1:1', '16:9', '4:3', '9:16', etc. (defaults to '1:1')

## Development

To build from source:

```bash
git clone https://github.com/yourusername/your-ai-photographer.git
cd your-ai-photographer
npm install
npm run build
```

## License

MIT
