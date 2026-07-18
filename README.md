# 🎬 Amazon Quick — Custom Demo Creation Skill

> **One command, complete demo.** Build fully personalised Amazon Quick demos spanning Desktop and Web capabilities — under 8 minutes, completely automated.

---

## What This Is

A skill for [Amazon Quick](https://aws.amazon.com/quick/) that automates the entire demo environment setup — from Knowledge Graph population to Activity Feed, dataset generation, branded presentations, and a complete demo script with exact prompts for every capability.

Instead of spending hours manually building a demo, you say `create custom demo`, answer 7 questions, and get a fully personalised end-to-end demo ready to present.

---

## 4 Operating Modes

| Command | Purpose |
|---------|---------|
| `create custom demo` | Build a complete demo environment from scratch for a customer or industry |
| `clean custom demo` | Surgically remove only tracked demo items — ready for a new demo |
| `backup custom demo` | Export current state as a portable backup (anytime, on demand) |
| `restore custom demo` | Reload from a previously exported backup |

---

## Demo Narrative Arc

```
Observe → Analyze → Act → Scale
```

| Phase | Acts | What's Demonstrated |
|-------|------|---------------------|
| **Observe** | 1–3 | Cross-channel intelligence (email, meeting prep, Slack) |
| **Analyze** | 4–5 | Knowledge Graph + natural language data Q&A |
| **Act** | 5b | Live integration actions (email, calendar, Slack/Teams) |
| **Scale** | 6–10 | Quick Web platform (Spaces, Agents, Flows, Research, Analysis, Apps) |

---

## The Demo Flow (10+ Acts)

### Quick Desktop (Always Included)

| Act | Capability | What Happens |
|-----|-----------|--------------|
| 1 | **Email Response** | Cross-channel synthesis — drafts a reply using context from KG, Slack, and calendar |
| 2 | **Meeting Prep** | Generates meeting notes from KG relationships and calendar context |
| 3 | **Slack Response** | Contextual reply drawing from cross-channel knowledge |
| 4 | **Knowledge Graph** | Visual entity explorer — shows the rich interconnected graph |
| 5 | **Dataset Q&A** | Natural language → data insights via an attached Space |
| 5b | **Integration Showcase** | Adaptive live actions — drafts email, creates calendar events, posts to Slack/Teams |

### Quick Web (Full Platform Mode Only)

| Act | Capability | What Happens |
|-----|-----------|--------------|
| 6 | **Spaces** | Multi-document Q&A and cross-source synthesis |
| 7 | **Chat Agents & Flows** | Custom AI persona + automated multi-step workflows |
| 8 | **Research** | Deep multi-source investigation with citations |
| 9 | **Generate Analysis** | Natural language → multi-sheet dashboard |
| 10 | **Apps** | Natural language → custom web application with brand colours |

---

## What Gets Built

| Component | Description | Specs |
|-----------|-------------|-------|
| 🧠 **Knowledge Graph** | People, projects, orgs, events — richly interconnected | 40–50 entities, 60–80 relationships |
| 📰 **Activity Feed** | Realistic notifications + Day Plan triggering demo acts 1–3 | 11–13 items + Day Plan card |
| 📊 **Dataset** | Industry-relevant CSV with positive trend, no hardcoded dates | 10,000 rows, 12 columns |
| 📽️ **Features Deck** | Customer-branded PPTX + interactive HTML explorer | 8 slides, brand colours applied |
| 📝 **Demo Script** | Complete walkthrough — every prompt, setup step, talking point | Markdown + Word formats |
| 📁 **Space Documents** | Strategy deck, project tracker, project brief | 3 files (Full Platform only) |

---

## Key Features

- **Customer Personalisation** — Auto-discovers brand colours via web search, generates industry-relevant storyline
- **Parallel Architecture** — 3 sub-tasks (dataset, presentation, Space docs) run simultaneously
- **Adaptive Integrations** — Ask-based: generates live action prompts only for connected tools
- **Incremental Manifest** — Tracks every entity ID, feed event ID, and filename as created — enables surgical cleanup
- **Never Goes Stale** — Zero hardcoded dates anywhere (years, quarters, months) — relative time only
- **Safe & Repeatable** — Clean removes only tracked items; backup/restore for portability
- **Scope Choice** — Desktop-only or Full Platform mode adapts to your audience
- **Self-Healing** — KG pre-flight check detects and repairs FTS corruption in pristine states
- **First-Run Overview** — Polished visual guide auto-opens on first use

---

## Getting Started

### ⚠️ Data Safety

> **Do not demo using your production Amazon BI account.** You risk sharing confidential data with your audience. Use QuickSwitch's Custom Demo Mode instead — it creates an isolated environment connected to the sales demo account.

---

### Path 1: QuickSwitch — Custom Demo Mode (Recommended)

Isolated environment connected to the sales demo account. Zero risk of exposing personal data.

1. Open **QuickSwitch** → select **Custom Demo Mode**
2. Choose a pre-saved custom demo or **Start from Scratch**
3. Follow prompts to connect to the **sales demo account** and create a folder
4. **Copy the generated folder name**, paste it in, create it, return and log in
5. **Add this skill first** — before doing anything else in the environment
6. Run `create custom demo` and answer the prompts
7. Use `backup custom demo` to save your work (recommended over QuickSwitch Save for portability)

> 💡 **Tip:** The skill's backup is portable across machines and shareable with colleagues — recommended over QuickSwitch's built-in Save.

---

### Path 2: Your Own Account — Enterprise SSO

Sign in with corporate credentials. Works for quick iterations or when QuickSwitch isn't available.

1. Sign in via **Enterprise SSO** (Entra ID, Okta, Google Workspace, PingOne, or Cognito)
2. **Add this skill** to your environment
3. Run `create custom demo`
4. Use `backup custom demo` to save before demoing
5. When done: `clean custom demo` to remove all demo artefacts

**Setup Guides:**
- [Official Enterprise Setup Guide](https://docs.aws.amazon.com/quick/latest/userguide/desktop-enterprise-setup.html)
- [Cognito OIDC Proxy (if you don't have an IdP)](https://aws-samples.github.io/sample-amazon-quick-suite-knowledge-hub/amazon-quick-on-desktop/)

---

## Skill Lifecycle Operations

### `create custom demo`
Builds the complete demo — KG, feed, dataset, presentation, script, Space docs.
> *Run after entering Custom Demo Mode or on a clean environment.*

### `backup custom demo`
Exports KG, feed items, and all files as a portable backup you can share or restore.
> *Use after building or iterating — works anytime, on demand.*

### `clean custom demo`
Surgically removes only tracked demo items — leaves everything else untouched.
> *Use between demos or when you want a fresh slate for a new customer.*

### `restore custom demo`
Reloads from a backup — repopulates KG, feed, and copies all files back.
> *Use when switching machines, sharing with colleagues, or rebuilding after clean.*

---

## Prerequisites

1. **Amazon Quick Desktop** — installed and running
2. **Authenticated** — via QuickSwitch Custom Demo Mode or Enterprise SSO
3. **This skill installed** — add it before running any other steps
4. **"Demo Readme" conversation** — auto-provided by QuickSwitch; validated at startup
5. **Quick Web access** (Full Platform only) — via Federate sign-in
6. **Integrations** (optional) — Outlook, Slack, Calendar, Teams for Act 5b

---

## Installation

Copy the contents of this repository to your skills directory:

```bash
~/.quickwork/profiles/<your-profile>/skills/custom-demo-creation/
```

The directory structure should look like:

```
custom-demo-creation/
├── SKILL.md                          ← Main orchestrator
├── steps/                            ← Individual step instructions (33 files)
│   ├── step_00.md                    ← First-run overview
│   ├── step_01.md ... step_29.md     ← Creation flow
│   ├── step_01b.md, step_01c.md      ← Sub-steps
│   ├── step_08b.md, step_09b.md      ← Sub-steps
│   ├── step_22b.md                   ← Integration showcase
│   ├── step_clean.md                 ← Clean flow
│   ├── step_backup.md                ← Backup flow
│   └── step_restore.md              ← Restore flow
├── sub-tasks/                        ← Parallel sub-task instructions
│   ├── dataset-generation.md         ← 10K row CSV + enrichment
│   ├── presentation-generation.md    ← 8-slide PPTX + HTML
│   └── space-documents.md            ← Strategy, tracker, brief
├── resources/
│   ├── quick-web-features.md         ← Quick Web capability reference
│   └── skill-overview.html           ← First-run visual overview
└── scripts/
    └── md_to_docx_converter.js       ← Markdown → DOCX conversion
```

---

## How It Works (Technical)

### Consultative Flow (User Interaction)
The skill asks 7 questions before building:
1. Customer or Industry target?
2. Target name?
3. Industry confirmation (auto-researches via web)
4. Desktop-only or Full Platform?
5. Use case notes / customisations?
6. Which integrations to showcase? (multi-select)
7. Brand colour confirmation (auto-discovered from web)

### Parallel Build Architecture
Three heavy tasks are dispatched as background workers:
- **Dataset generation** — 10K rows with positive trend
- **Presentation generation** — branded PPTX + interactive HTML
- **Space documents** — strategy deck, tracker, brief (Full Platform only)

While those run, the main flow populates the KG (40-50 entities), builds the Activity Feed (11-13 items), and writes the demo script.

### Manifest Tracking
Every item created is tracked incrementally in `demo-manifest.json`:
- KG entity IDs and edge IDs
- Feed event IDs
- Artifact filenames
- Day Plan publication status

This enables the `clean` command to surgically remove only what was created.

### Safety Rails
- **QuickSwitch prerequisite check** — won't run outside a demo builder state
- **KG pre-flight** — detects and repairs FTS corruption in pristine states
- **No hardcoded dates** — validated across all files (regex checked)
- **Email draft mode** — integration showcase defaults to drafts (never auto-sends)
- **Presenter cleanup notes** — calendar/Slack/Teams actions include deletion reminders

---

## Stats

| Metric | Value |
|--------|-------|
| Files | 46 |
| Total size | ~115 KB |
| Triggers | 4 |
| Workflow steps | 29+ |
| Parallel sub-tasks | 3 |
| Build time | ~5–8 minutes |

---

## Author

**Mrunal Shridhar**
Sr WW GenAI SA — Amazon Quick

📧 mrushri@amazon.co.uk
💬 @mrushri

---

*Feedback, ideas, or contributions welcome — reach out anytime.*
