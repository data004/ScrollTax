# ScrollTax 🚨

**Binance Agent OS Mini Hackathon | Track B Submission**

ScrollTax is a productivity tool that connects your real world browsing habits directly to the Binance Agent OS. It uses the Model Context Protocol (MCP) to turn doomscrolling into a financial penalty, executing automated trades when you exceed your screen time limits.

## The Architecture

1. **Browser Extension:** Monitors screen time on distracting websites like X.
2. **Custom MCP Server:** A local Node.js server that exposes the `trigger_penalty` tool.
3. **AI Orchestrator (Genkit):** Receives the event, queries live Binance market data, and decides which volatile asset to purchase based on current market conditions.
4. **Binance Agent OS:** Executes the Spot Market Buy on an isolated subaccount using the official `binance-mcp-server`.
5. **Next.js Dashboard:** A neobrutalist UI built with Tailwind CSS to visualize your penalties and Agent OS execution logs.

## Setup Instructions

### 1. Environment Variables
Rename `.env.example` to `.env.local` and add your keys:
```env
GOOGLE_GENAI_API_KEY="your_gemini_api_key"
BINANCE_AGENT_TOKEN="your_binance_subaccount_token"
