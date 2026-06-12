# A2A / Agent-Interoperability Ecosystem Updates (mid-2025 → June 2026)

Research compiled 2026-06-11 for the a2acatalog.com content refresh.
Facts marked **[verified]** were checked live against GitHub/official endpoints
on 2026-06-11; the rest are from public announcements through early 2026.

## A2A Protocol

- **Linux Foundation governance.** Google donated the Agent2Agent protocol to
  the Linux Foundation in June 2025 (announced at Open Source Summit North
  America, 2025-06-23). It now lives at **github.com/a2aproject/A2A** with the
  official site at **a2a-protocol.org** **[verified]** — the old
  `google-a2a.github.io` / `github.com/google-a2a` URLs are legacy. Founding
  members included Google, AWS, Cisco, Microsoft, Salesforce, SAP, and
  ServiceNow; 100+ companies now back the project.
- **Spec status: v1.0 is out.** Release history **[verified via GitHub releases]**:
  - v0.2.5 — 2025-06-30
  - v0.3.0 — 2025-07-30 (gRPC transport, signed/extended Agent Cards)
  - **v1.0.0 — 2026-03-12** (first stable major release)
  - **v1.0.1 — 2026-05-28** (current latest)
- Repo traction: ~24.2k GitHub stars, actively maintained (last push
  2026-06-05) **[verified]**.
- Official SDKs under the a2aproject org: Python, JS/TS, Java, .NET, Go.

## MCP (Model Context Protocol)

- **Spec revisions.** Current stable revision is **2025-11-25**
  (modelcontextprotocol.io/specification/latest resolves there
  **[verified]**), following 2025-06-18. The next revision, **2026-07-28, is
  in RC** as of late May 2026 **[verified via GitHub releases]**.
- **MCP Registry.** The official community registry
  (registry.modelcontextprotocol.io, github.com/modelcontextprotocol/registry)
  launched in preview September 2025 and is now the canonical metaregistry for
  publishing/discovering MCP servers (~6.9k stars, active) **[verified]**.
  Relevant to this site: our `mcp_servers` table (269 rows, seeded June 2025)
  predates the registry — syncing from the registry API would be the natural
  refresh path.
- A2A and MCP remain complementary: MCP = agent ↔ tools/context,
  A2A = agent ↔ agent. Both are now under neutral/open governance rather than
  single-vendor branding, so copy like "Anthropic's MCP" / "Google's A2A"
  is dated.

## Frameworks

- **AutoGen → AG2 + Microsoft Agent Framework.** The community fork **AG2**
  ("formerly AutoGen", github.com/ag2ai/ag2) continues independently
  **[verified]**. Microsoft converged AutoGen and Semantic Kernel into the
  **Microsoft Agent Framework** (github.com/microsoft/agent-framework,
  announced Oct 2025; Python + .NET, ~11.3k stars, very active)
  **[verified]** — it supports both MCP and A2A.
- **LangGraph** hit **1.0** (Oct 2025); current release line is 1.2.x
  (1.2.4, June 2026) **[verified]**. A2A integration available via the
  a2aproject samples and LangChain's agent stack.
- **CrewAI** remains one of the most popular agent frameworks (~53k stars,
  active June 2026) **[verified]**.
- **Google ADK** (Agent Development Kit, github.com/google/adk-python, ~20k
  stars, active) is Google's first-party A2A-native framework **[verified]**.
- Semantic Kernel continues for .NET but new multi-agent work is directed to
  the Microsoft Agent Framework.

## What this means for the catalog

1. **Copy fixes (done in this refresh):** Linux Foundation governance, v1.0
   spec status, a2a-protocol.org links, AutoGen→AG2/Agent Framework note,
   dynamic copyright year.
2. **Data freshness (not done — needs a content pass):**
   - `agents` (105 rows) still receives organic submissions (latest
     2026-05-31) — moderation/verification pass recommended.
   - `mcp_servers` (269 rows) frozen since 2025-06-26 — consider syncing from
     the official MCP Registry API.
   - `workflows` (2,055 rows) is a one-shot n8n import from 2025-07-09.
3. **Directory landscape:** the official MCP Registry plus vendor agent
   stores/marketplaces (e.g. cloud-provider agent marketplaces) emerged since
   this site launched; a2acatalog's niche is the A2A-agent index, which the
   official project still does not provide.
