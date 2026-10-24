# WonderLens

WonderLens is a React app for exploring the science behind everyday things. Its AI features use Gemma through a small Node.js backend and a local Ollama installation.

## Requirements

- Node.js 20.19+ (or 22.12+)
- Ollama installed and running
- The Gemma 3 model installed in Ollama (defaults to `gemma3:4b`)

## Run locally

In a terminal, download the model and start Ollama:

```powershell
ollama pull gemma3:4b
ollama serve
```

In a second terminal, start the frontend and backend together:

```powershell
npm install
npm run dev
```

Vite serves the UI at `http://localhost:5173`; `/api` requests are proxied to the backend at `http://127.0.0.1:3001`.

To use a different Ollama host or model in PowerShell:

```powershell
$env:OLLAMA_BASE_URL = "http://127.0.0.1:11434"
$env:GEMMA_MODEL = "gemma3:4b"
npm run dev
```

The backend binds to loopback by default. Keep it there for local development; do not expose it publicly without adding authentication, rate limiting, and deployment-specific protections.

## Production build

```powershell
npm run build
npm start
```

The Node server serves the built app and the Gemma API from the same origin. Configure `PORT`, `HOST`, `OLLAMA_BASE_URL`, and `GEMMA_MODEL` through the hosting environment as needed. A public deployment must secure the API before allowing external traffic.

## Tests and checks

```powershell
npm run test:backend
npm run typecheck
npm run lint
npm run build
```
