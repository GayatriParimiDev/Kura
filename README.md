<div align="center">

<br />

<!-- Logo / Banner -->
<img width="120" height="120" alt="KURA Logo" src="https://img.icons8.com/fluency/120/000000/heart-health.png" />

<h1>KURA — AI Healthcare Literacy Platform</h1>

<p align="center">
  <em>Decode complex medical reports into clear, compassionate, multilingual summaries — powered by Google Gemini AI.</em>
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Google%20Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
</p>

<p align="center">
  <a href="https://ai.studio/apps/7b7da70f-7520-41af-b6f6-09c49fa32e62">
    <img src="https://img.shields.io/badge/View%20on-AI%20Studio-FF6B35?style=for-the-badge&logo=google&logoColor=white" alt="View on AI Studio" />
  </a>
</p>

</div>

---

## 📖 What is KURA?

**KURA** is an AI-powered healthcare literacy companion that bridges the gap between complex medical jargon and everyday understanding. Patients, families, and caregivers can upload or paste their medical reports — lab results, blood panels, imaging summaries — and receive:

- 🧬 **Plain-English Summaries** — explanations written for a 15-year-old, free of clinical complexity
- 🔬 **Key Findings Breakdown** — each biomarker decoded with its value, normal range, and simple meaning
- 📚 **Medical Glossary** — automatic definitions for unfamiliar terms and acronyms
- 💬 **Contextual AI Chat** — ask follow-up questions about *your specific report*, safely and compassionately
- 🌍 **Multilingual Translation** — on-the-fly translation of the entire decoded analysis into multiple languages
- 📄 **Multimodal Upload Support** — works with pasted text, PDF documents, and image scans

> ⚕️ **Safety First:** KURA is strictly an educational tool. It never diagnoses, prescribes, or replaces professional clinical advice.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Gemini-Powered Analysis** | Uses `gemini-3.5-flash` with structured JSON schema for reliable, parseable responses |
| 🔁 **Multi-Model Resilience** | Automatic fallback across model tiers with exponential backoff retry logic |
| 🖼️ **Multimodal Input** | Accepts raw text, base64 PDFs, and image scans (JPEG, PNG) |
| 💬 **Report-Grounded Chat** | Chat assistant is always contextualized with the user's decoded report |
| 🌐 **Multilingual Output** | Translate analyses into the user's preferred language via a single click |
| 🎭 **Simulation Mode** | Gracefully falls back to realistic simulated data when no API key is configured |
| 📊 **Dashboard & History** | View all past reports, their status, and navigate to detailed analysis pages |
| 🔐 **Auth Flow** | Login / Register UI with session-based state management |

---

## 🏗️ Architecture

```
KURA/
├── server.ts              # Express.js backend — Gemini API proxy, retry engine, routes
├── src/
│   ├── App.tsx            # Root React component — view routing & state management
│   ├── main.tsx           # React entry point
│   ├── index.css          # Global styles (TailwindCSS v4)
│   ├── types.ts           # Shared TypeScript interfaces (UserReport, ReportAnalysis, etc.)
│   ├── components/
│   │   ├── Header.tsx         # Top navigation bar
│   │   ├── LandingPage.tsx    # Marketing landing page with demo entry
│   │   ├── AuthPage.tsx       # Login & Register forms
│   │   ├── Dashboard.tsx      # Report list, upload, management
│   │   ├── AnalysisPage.tsx   # Detailed decoded report view
│   │   ├── ChatAssistant.tsx  # Conversational AI assistant component
│   │   ├── KuraLogo.tsx       # Brand logo SVG component
│   │   └── SaaSPageViews.tsx  # Additional pages (About, Features, Pricing, etc.)
│   └── utils/
│       └── demoData.ts        # Pre-loaded demo report samples
├── vite.config.ts         # Vite + React + TailwindCSS plugin configuration
├── tsconfig.json          # TypeScript compiler configuration
├── package.json           # Dependencies and npm scripts
├── .env.example           # Environment variable template
└── index.html             # HTML entry point for the SPA
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | `^19.0.1` | UI component framework |
| **TypeScript** | `~5.8.2` | Type safety across the entire codebase |
| **Vite** | `^6.2.3` | Lightning-fast dev server and build tool |
| **TailwindCSS** | `^4.1.14` | Utility-first styling via `@tailwindcss/vite` plugin |
| **Lucide React** | `^0.546.0` | Icon library |
| **Motion** | `^12.23.24` | Animations and page transitions |
| **React Markdown** | `^10.1.0` | Render AI-generated markdown responses |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Express.js** | `^4.21.2` | HTTP server and REST API routing |
| **@google/genai** | `^2.4.0` | Official Google Gemini AI SDK |
| **dotenv** | `^17.2.3` | Environment variable loading |
| **tsx** | `^4.21.0` | Run TypeScript server files directly |
| **esbuild** | `^0.25.0` | Bundle server for production |

---

## ⚙️ Environment Variables

KURA uses the following environment variables. Create a `.env` file in the project root based on the template below (also found in `.env.example`):

```env
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key — get one at [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `APP_URL` | ⬜ Optional | The public URL of the deployed app. Used for self-referential links and OAuth callbacks |

> **Note:** If `GEMINI_API_KEY` is missing or set to the placeholder value `MY_GEMINI_API_KEY`, KURA automatically runs in **simulation mode**, returning realistic demo responses without making real API calls.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- A **Google Gemini API key** (free tier available at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation & Local Run

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd Kura

# 2. Install all dependencies
npm install

# 3. Set up your environment variables
# Create a .env file in the root and add your Gemini API key:
echo 'GEMINI_API_KEY="your_actual_api_key_here"' > .env

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the full-stack dev server (Vite + Express via `tsx`) |
| `npm run build` | Build frontend (Vite) + bundle backend (esbuild) for production |
| `npm run start` | Run the production build (`node dist/server.cjs`) |
| `npm run lint` | TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Remove the `dist/` build folder |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check — returns API key status and environment |
| `POST` | `/api/analyze` | Analyze a medical report (text, PDF, or image) |
| `POST` | `/api/chat` | Send a chat message grounded in the decoded report context |

### `POST /api/analyze` — Request Body

```json
{
  "text": "Patient lab results...",
  "fileData": "base64encodedstring...",
  "mimeType": "application/pdf",
  "language": "English"
}
```

### `POST /api/analyze` — Response

```json
{
  "analysis": {
    "simple_summary": "A plain-language overview of the report...",
    "key_findings": [
      {
        "marker": "LDL Cholesterol",
        "value": "158 mg/dL",
        "status": "high",
        "normalRange": "< 100 mg/dL",
        "meaning": "This fat delivers structure to cells, but excessive volumes can build deposits..."
      }
    ],
    "term_definitions": [
      { "term": "LDL", "definition": "Low-Density Lipoprotein..." }
    ],
    "doctor_questions": [
      "Should we coordinate metabolic panel trends?"
    ],
    "safety_disclaimer": "KURA is an educational decoding companion and must never replace a medical consult..."
  }
}
```

---

## 🔒 Safety & Ethics

KURA is built with strict medical safety guardrails:

- ❌ **No diagnosis** — KURA never says "You have X condition"
- ❌ **No prescriptions** — No medication, dosage, or supplement recommendations
- ❌ **No treatment advice** — No lifestyle or therapeutic alternatives are suggested
- ✅ **Always defers** — Every response encourages consulting a licensed healthcare professional
- ✅ **Safety disclaimer** — Mandatory disclaimer is always included in every analysis

---

## 📄 License

This project was bootstrapped with **Google AI Studio** and is intended as an educational healthcare literacy tool.

> **KURA is not a medical device, diagnostic tool, or substitute for professional clinical advice. Always consult a licensed healthcare provider for medical guidance.**

---

<div align="center">
  <p>Made with ❤️ and powered by <strong>Google Gemini AI</strong></p>
  <img src="https://img.shields.io/badge/Powered%20by-Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white" alt="Powered by Google Gemini" />
</div>
