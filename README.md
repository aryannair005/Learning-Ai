# Learning AI 🤖

A hands-on repository for learning and experimenting with modern LLM application development using **Node.js, Express, Gemini, LangChain, and LangGraph**.

This repository is organized as a progression from a basic LLM API integration to a stateful AI agent capable of using tools and conversation memory.

## 📚 What This Repository Covers

| Module | Focus | Main Technologies |
| --- | --- | --- |
| `Normal_LLM` | Direct LLM API integration | Node.js, Express, Google Gemini |
| `Langchain` | Working with LLMs through LangChain | LangChain, Groq, Express |
| `Langgraph` | Building a stateful tool-using AI agent | LangGraph, Groq, Tavily, MemorySaver |

## 🧠 Learning Path

### 1. Normal LLM

The `Normal_LLM` module demonstrates a basic backend integration with Google's Gemini API.

It exposes:

- `GET /` — basic server check
- `POST /ai` — sends user input to the Gemini model

The model is configured with a system instruction that defines the assistant as **Jarvis**.

### 2. LangChain

The `Langchain` module introduces LangChain's chat model abstraction.

It uses:

- `ChatGroq`
- Groq's `openai/gpt-oss-120b` model
- Express for the HTTP API

The example focuses on structured chat-model invocation and uses a system instruction to translate **Hindi to English**.

### 3. LangGraph AI Agent

The `Langgraph` module builds on LangChain and introduces an agent workflow using LangGraph.

The agent includes:

- **State management** with `MessagesAnnotation`
- **Graph-based execution** with `StateGraph`
- **Tool calling** with `ToolNode`
- **Web search** with `TavilySearch`
- **Conversation memory** with `MemorySaver`
- **Conditional routing** between the agent and tools
- **Groq LLM** using `openai/gpt-oss-120b`

The agent is instructed to use conversation memory first and call external tools only when real-time information is needed.

## 🏗️ Project Structure

```text
Learning-Ai/
│
├── Normal_LLM/
│   ├── index.js
│   └── package.json
│
├── Langchain/
│   ├── index.js
│   └── package.json
│
└── Langgraph/
    ├── index.js
    └── package.json
```

## ⚙️ Prerequisites

Make sure you have:

- [Node.js](https://nodejs.org/) installed
- A **Gemini API key** for the `Normal_LLM` module
- A **Groq API key** for the LangChain and LangGraph modules
- A **Tavily API key** for the LangGraph web-search tool

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/aryannair005/Learning-Ai.git
cd Learning-Ai
```

Each module has its own `package.json`, so install dependencies inside the module you want to run.

### Run Normal LLM

```bash
cd Normal_LLM
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the server:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

Test:

```http
POST /ai
Content-Type: application/json

{
  "input": "Hello, Jarvis!"
}
```

### Run LangChain

```bash
cd Langchain
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Start the server:

```bash
npm run dev
```

Test:

```http
POST /ai
Content-Type: application/json

{
  "input": "मैं आज बाजार जा रहा हूँ।"
}
```

### Run LangGraph

```bash
cd Langgraph
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Start the server:

```bash
npm run dev
```

Test:

```http
POST /ai
Content-Type: application/json

{
  "input": "What is the current weather in Delhi?"
}
```

## 🔄 LangGraph Agent Flow

The LangGraph implementation follows this workflow:

```text
User Input
    │
    ▼
┌───────────┐
│   Agent   │
│   (LLM)   │
└─────┬─────┘
      │
      ▼
 Does the model
 request a tool?
   /        \
  Yes        No
  │           │
  ▼           ▼
Tools       End
  │
  ▼
Agent
  │
  └──────► End
```

The model can decide whether an external tool is needed, execute the tool, and then continue through the graph.

## 🛠️ Technologies Used

- Node.js
- Express.js
- Google Gemini
- LangChain
- LangGraph
- Groq
- Tavily
- dotenv
- JavaScript / ES Modules

## 🎯 Purpose

This repository is a learning project focused on understanding how LLM applications evolve:

```text
Direct LLM API
      ↓
   LangChain
      ↓
   LangGraph
      ↓
 Stateful AI Agents
      ↓
 Tool-using AI Agents
```

The goal is to build a strong foundation in **LLM application development and AI agents** by implementing concepts step by step.

## 🔮 Possible Next Steps

- Persistent conversation storage
- Multiple specialized tools
- Streaming responses
- Better request validation and error handling
- Authentication
- Frontend chat interface
- Multi-agent workflows
- Database-backed memory
- Deployment

## 👨‍💻 Author

**Aryan Nair**

GitHub: [@aryannair005](https://github.com/aryannair005)

---

⭐ This repository is a learning journey through modern AI application development.
