# Amazon Quick Web Features Reference

Use this document when generating Quick Web demo script content (Acts 6-10). These descriptions should inform your prompts and talking points.

---

## Spaces

**What they are:** Unified knowledge centres where you organize files, dashboards, topics, knowledge bases, and datasets. They enable highly contextual conversations and scale across personal, team, and cross-team use cases.

**What can be added to a Space:**
- Documents (PPTX, DOCX, PDF, XLSX, etc.)
- Datasets (CSV uploads with enrichment)
- Dashboards
- Topics (semantic layers over datasets)
- Knowledge bases
- Application actions

**How they're used in conversation:**
- Attach a Space to a chat conversation via the "+" button
- The AI can then search and reason across ALL sources in that Space
- Cross-document synthesis — ask questions that span multiple files
- Data + documents combined — correlate structured data with unstructured knowledge

**Team sharing:** Spaces can be shared with other users for collaborative knowledge management.

---

## Chat Agents

**What they are:** Custom AI-powered assistants configured with specific personas, knowledge sources, and tools. They generate content, analyze information, and take actions through natural conversation.

**Configuration options:**
- **Persona/Instructions:** Custom system prompt defining personality, expertise, tone, constraints
- **Knowledge Sources:** Attach one or more Spaces as the agent's knowledge base
- **Action Connectors:** Connect external tools the agent can invoke
- **Suggested Prompts:** Pre-configured prompt suggestions for users
- **Reference Documents:** Files that inform the agent's behavior without being searchable

**Types:**
- System chat agent (default, available to all users)
- Custom chat agents (created by users, shareable)

---

## Flows

**What they are:** Multi-step automated workflows that combine AI reasoning with business actions. Created from natural language, the visual editor, or from chat agent conversations.

**Available step types:**

| Category | Step Type | Description |
|----------|-----------|-------------|
| AI Responses | Chat agent | Gets a response from a custom agent, can take actions |
| AI Responses | Research | Conducts research on a topic |
| AI Responses | Web search | Gets a response using web search |
| AI Responses | General knowledge | Gets a response from base AI models |
| AI Responses | UI agent | Performs tasks on public websites |
| AI Responses | Create image | Generates an image from inputs |
| Flow Logic | Reasoning group | Adds run instructions to one or more steps |
| Data Insights | Quick data | Gets insights from spaces or knowledge bases |
| Data Insights | Dashboards and topics | Gets responses from dashboards and topics |
| Data Insights | Application actions | Reads or writes to connected apps |
| User Input | Text | Gets text input from users |
| User Input | Files | Gets file input from users |

**Execution modes:** Guided step-by-step OR conversational chat mode with follow-ups.

**Sharing:** Flows can be published to an admin-managed library and shared with other users.

---

## Research

**What it is:** AI-powered deep research that gathers, analyzes, and synthesizes information from multiple sources including enterprise data, web search (200+ trusted news outlets like Forbes, AP News, NYT, Washington Post), uploaded files, and connected Spaces.

**How it works:**
1. Define your research objective in natural language
2. Quick Research organizes it into clear topics
3. Executes a structured plan, analyzing enterprise data alongside web search
4. Produces a comprehensive, cited research report

**Sources available:**
- Enterprise knowledge (Spaces, knowledge bases)
- Web search (200+ trusted outlets)
- Uploaded files
- Third-party data providers

**Can be used as a step within Flows** for automated research reports.

---

## Generate Analysis

**What it is:** Generate multi-sheet analyses/dashboards from natural language prompts. Describe the analysis you want, and Quick creates multiple organized sheets with visuals, filter controls, and calculated fields.

**How to use it:**
1. Open a dataset → Choose "Generate analysis"
2. Select 1-3 datasets for the analysis
3. Enter a natural language prompt describing what you want
4. Quick generates the complete analysis

**What it creates:**
- Multiple organized sheets/tabs
- Appropriate chart types (bar, line, pie, heat map, KPI cards, tables)
- Filter controls for interactive exploration
- Calculated fields (year-over-year growth, month-over-month comparisons, running totals)
- Proper aggregations and groupings

**Key capability:** One prompt → executive-ready multi-sheet dashboard.

---

## Apps

**What they are:** Custom web applications built through natural language prompts. Business users can create sophisticated tools without coding.

**How to create:**
1. Navigate to Apps
2. Enter a description of what you want
3. Quick generates a live preview
4. Iterate via the chat panel (modify, add features, fix issues)
5. Publish and share

**Features:**
- Live preview updates as you iterate
- Automatic version history (restore any previous version)
- Connect to Spaces for live data
- Connect action connectors for external integrations
- Share with specific users or publish to the entire account
- Public publishing available (no sign-in required)

**Design guidance for prompts:**
- Describe purpose, audience, and data needs
- Be specific about sections and components wanted
- Mention branding/colours in a follow-up iteration prompt
- Ask for interactive elements (buttons, forms, tables, charts)
