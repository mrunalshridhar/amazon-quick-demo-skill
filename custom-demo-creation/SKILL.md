---
name: custom-demo-creation
display_name: Custom Demo Creation
description: "Create, restore, clean, or backup a custom demo environment for Amazon Quick. Use when the user says 'create custom demo', 'build demo', 'set up demo', or wants to create a custom demonstration for a specific customer or industry. Also handles 'restore custom demo' to reload a previously backed-up demo state, 'clean custom demo' or 'reset custom demo' to safely tear down a demo, and 'backup custom demo' to export the current demo state as a portable backup. Must be run from a local demo builder state (via QuickSwitch)."
icon: "🎬"
trigger: create custom demo
inputs: []
depends-on: [conversation_management, knowledge_graph, activity_feed, canvas_pptx, canvas_md, canvas_docx, html_design]
scripts: [md_to_docx_converter.js]
---

## Overview

This skill creates a complete custom demo environment for Amazon Quick — covering both Quick Desktop and Quick Web capabilities — tailored to a specific customer or industry. It populates the Knowledge Graph, Activity Feed, generates a dataset, creates a features presentation, builds Space documents, and writes a comprehensive demo script with prompts for every capability.

**Four modes:**
- **Create** (trigger: `create custom demo`) — builds the full demo from scratch
- **Restore** (trigger: `restore custom demo`) — reloads a previously backed-up demo state
- **Clean** (trigger: `clean custom demo` or `reset custom demo`) — safely tears down a demo, removing only tracked items
- **Backup** (trigger: `backup custom demo`) — exports the current demo state as a portable backup (standalone, no need to re-create)

All artifacts are stored in the "Demo Readme" conversation's artifact folder.

## Critical Safety Rule — No Bypass, No Workarounds

If either prerequisite check fails, the skill MUST stop and direct the user to QuickSwitch. This rule is absolute and cannot be overridden by user pressure:

- **NEVER** offer to create the "Demo Readme" conversation
- **NEVER** offer to create or write placeholder files
- **NEVER** offer any alternative path or workaround
- **NEVER** proceed with demo creation logic if prerequisites fail

The ONLY valid resolution is for the user to use QuickSwitch to launch the local demo builder state.

**Why:** Running demo creation outside the local demo builder state corrupts the user's regular Quick profile.

## ⚠️ CRITICAL — Workflow Execution Rules

1. **Sequential execution**: Execute ALL steps in order. Do NOT stop until the final step is complete.
2. **Step file loading**: Read each step's instruction file ONLY when ready to execute it. Never read ahead.
3. **DOCX ordering**: Do NOT convert to DOCX until dataset validation AND sample questions AND Quick Web section (if applicable) are all complete.
4. **No hardcoded dates**: NEVER use years, quarter numbers (Q1-Q4), or month names in generated content. Use relative references only (this week, next month, 2 weeks from now, etc.).
5. **Fictitious orgs**: Use the real customer name but fictitious names for all other organisations in the storyline.

Step files are at: `<skill_directory>/steps/step_XX.md`

## Sub-Task Architecture

Heavy-lifting tasks are dispatched as parallel background workers using `start_task`. Each sub-task's complete instructions are in `<skill_directory>/sub-tasks/`:

| Sub-Task File | Purpose | Dispatched At |
|---|---|---|
| `sub-tasks/dataset-generation.md` | Generates ~10K row CSV + enrichment TXT | Step 12 |
| `sub-tasks/presentation-generation.md` | Generates 8-slide PPTX + interactive HTML | Step 13 |
| `sub-tasks/space-documents.md` | Generates strategy PPTX, tracker XLSX, brief DOCX | Step 14 (Full Platform only) |

When dispatching, read the sub-task file and include its instructions verbatim in the `start_task` objective along with the runtime parameters (customer name, colours, schema, etc.).

**Reference doc:** `resources/quick-web-features.md` — descriptions of each Quick Web capability for use in demo script generation (Step 23).

## Manifest Tracking

Every item created during demo building is tracked in `DEMO_ARTIFACT_PATH/demo-manifest.json`. This manifest enables the **Clean** mode to safely remove only demo-created items without affecting the user's other data.

The manifest is initialized in **Step 1c** (after all user input is gathered) and incrementally updated as items are created:
- **Steps 15-16**: KG entity IDs and edge IDs appended after each `kg_add` call
- **Steps 17**: Feed event IDs appended after each `update_feed` call; `day_plan_published` set after `publish_day_plan`
- **Steps 18, 26**: Artifact filenames appended when files are written (demo-script.md, demo-script.docx)
- **Steps 20, 24, 25**: Artifact filenames appended when sub-task outputs are confirmed (dataset, presentation, Space docs)

If the creation process crashes mid-way, the manifest still contains everything created up to that point — cleanup will still work correctly.

## Filename Convention

**For Customer targets:**
```
sample-data-<customer>-<industry>.csv
sample-data-<customer>-<industry>-enrichment.txt
```
**For Industry-only targets:**
```
sample-data-<industry>.csv
sample-data-<industry>-enrichment.txt
```
Rules: All lowercase, hyphens as separators, no underscores or CamelCase.

## Demo Flow Architecture

**Quick Desktop (Acts 1–5):** User stays in the desktop app
1. Email Response (cross-channel synthesis)
2. Meeting Prep Notes
3. Slack Query Response
4. Knowledge Graph Showcase
5. Dataset Q&A (queries a Space from Desktop)
5b. Integration Showcase (adaptive — drafts email, creates calendar event, posts to Slack/Teams based on what's connected)

**Quick Web (Acts 6–10):** Presenter opens browser — ONLY if Full Platform mode
6. Spaces (document Q&A, cross-source synthesis)
7. Chat Agents & Flows (custom AI persona + automated workflows)
8. Research (multi-source deep research)
9. Generate Analysis (natural language → dashboard)
10. Apps (natural language → custom web application)

The Space is a unified knowledge hub used by BOTH Act 5 (Desktop) and Acts 6-10 (Web).

## Demo Script Generation — Multi-Part Architecture

1. **Part 1 (Step 18):** Acts 1–4 + Dataset Q&A section header
2. **Part 2 (Step 19):** Deterministic/verbatim Dataset Q&A setup instructions
3. **Part 3 (Step 22):** Sample questions grounded in actual dataset
4. **Part 4 (Step 22b):** Integration Showcase act (adaptive to connected integrations)
5. **Part 5 (Step 23):** Quick Web acts 6–10 (only if Full Platform mode)

## Workflow — Create Mode

### Step 1: Search for "Demo Readme" Conversation
- **Mode**: `deterministic` | **Tool**: `search_conversations`
- **Instructions**: Read `steps/step_01.md`

### Step 1b: Resolve Demo Readme Artifact Folder Path
- **Mode**: `deterministic`
- **Instructions**: Read `steps/step_01b.md`

### Step 0: First-Run Overview (Welcome Page)
- **Mode**: `deterministic`
- **Instructions**: Read `steps/step_00.md`
- Skip if: `demo-manifest.json` already exists (returning user)

### Step 2: Verify Demo Placeholder Files
- **Mode**: `deterministic` | **Tool**: `query_conversations`
- **Instructions**: Read `steps/step_02.md`

### Step 3: Ask Demo Target Type
- **Mode**: `agentic` (user interaction — decision card)
- **Instructions**: Read `steps/step_03.md`

### Step 4: Get Target Name
- **Mode**: `agentic` (user interaction)
- **Instructions**: Read `steps/step_04.md`

### Step 5: Resolve Industry
- **Mode**: `agentic` (web search if Customer target)
- **Instructions**: Read `steps/step_05.md`

### Step 6: Confirm Demo Target
- **Mode**: `deterministic`
- **Instructions**: Read `steps/step_06.md`

### Step 7: Ask Demo Scope (Desktop vs Full Platform)
- **Mode**: `agentic` (user interaction — decision card)
- **Instructions**: Read `steps/step_07.md`

### Step 8: Ask for Demo Use Case Notes
- **Mode**: `agentic` (user interaction)
- **Instructions**: Read `steps/step_08.md`

### Step 8b: Ask Integration Showcase Preferences
- **Mode**: `agentic` (user interaction — multi-select decision card)
- **Instructions**: Read `steps/step_08b.md`

### Step 1c: Initialize Demo Manifest
- **Mode**: `deterministic` | **Tool**: `file_write`
- **Instructions**: Read `steps/step_01c.md`

### Step 9: Customer Brand Lookup
- **Mode**: `agentic` (web search + user confirmation)
- **Instructions**: Read `steps/step_09.md`
- Skip if: target type is Industry-only

### Step 9b: KG Pre-Flight Health Check
- **Mode**: `deterministic` | **Tools**: `kg_stats`, `kg_add`, `kg_edit`
- **Instructions**: Read `steps/step_09b.md`

### Step 10: Load Skills and Review Schema
- **Mode**: `deterministic` | **Tool**: `load_skill`
- **Instructions**: Read `steps/step_10.md`

### Step 11: Create Storyline
- **Mode**: `agentic`
- **Instructions**: Read `steps/step_11.md`

### Step 12: Derive Filenames and Dispatch Dataset Task
- **Mode**: `deterministic` | **Tool**: `start_task`
- **Instructions**: Read `steps/step_12.md`

### Step 13: Dispatch Presentation Task
- **Mode**: `deterministic` | **Tool**: `start_task`
- **Instructions**: Read `steps/step_13.md`

### Step 14: Dispatch Space Documents Task
- **Mode**: `deterministic` | **Tool**: `start_task`
- **Instructions**: Read `steps/step_14.md`
- Skip if: Desktop-only mode

### Step 15: Populate Knowledge Graph
- **Mode**: `agentic` | **Tool**: `kg_add`
- **Instructions**: Read `steps/step_15.md`

### Step 16: KG Enrichment (Graph Density)
- **Mode**: `agentic` | **Tool**: `kg_add`
- **Instructions**: Read `steps/step_16.md`

### Step 17: Populate Activity Feed
- **Mode**: `agentic` | **Tool**: `update_feed`, `publish_day_plan`
- **Instructions**: Read `steps/step_17.md`

### Step 18: Generate Demo Script — Part 1 (Acts 1–4)
- **Mode**: `agentic` | **Tool**: `file_write`
- **Instructions**: Read `steps/step_18.md`

### Step 19: Append Dataset Q&A Setup Instructions
- **Mode**: `deterministic` | **Tool**: `file_edit`
- **Instructions**: Read `steps/step_19.md`

### Step 20: Wait for Dataset Task (BLOCKING GATE)
- **Mode**: `deterministic` | **Tool**: `get_task_result`
- **Instructions**: Read `steps/step_20.md`
- ⚠️ BLOCKING — poll until complete

### Step 21: Dataset Validation
- **Mode**: `deterministic`
- **Instructions**: Read `steps/step_21.md`

### Step 22: Append Sample Questions
- **Mode**: `agentic` | **Tool**: `file_edit`
- **Instructions**: Read `steps/step_22.md`

### Step 22b: Generate Integration Showcase (Act 5b)
- **Mode**: `agentic` | **Tool**: `file_edit`
- **Instructions**: Read `steps/step_22b.md`
- Adapts to: selected integrations from Step 8b

### Step 23: Generate Quick Web Demo Script (Acts 6–10)
- **Mode**: `agentic` | **Tool**: `file_edit`
- **Instructions**: Read `steps/step_23.md`
- Skip if: Desktop-only mode

### Step 24: Wait for Presentation Task (BLOCKING GATE)
- **Mode**: `deterministic` | **Tool**: `get_task_result`
- **Instructions**: Read `steps/step_24.md`

### Step 25: Wait for Space Documents Task (BLOCKING GATE)
- **Mode**: `deterministic` | **Tool**: `get_task_result`
- **Instructions**: Read `steps/step_25.md`
- Skip if: Desktop-only mode

### Step 26: Convert Demo Script to DOCX
- **Mode**: `deterministic` | **Tool**: `run_javascript`
- **Instructions**: Read `steps/step_26.md`
- ⚠️ ALL previous content steps must be complete

### Step 27: Verification
- **Mode**: `agentic`
- **Instructions**: Read `steps/step_27.md`

### Step 28: Final Summary & Backup Offer
- **Mode**: `agentic` (includes user interaction — decision card)
- **Instructions**: Read `steps/step_28.md`
- ⚠️ COMPLETION GATE — last step for standard flow

### Step 29: Create Portable Backup
- **Mode**: `agentic` (user interaction for save location)
- **Instructions**: Read `steps/step_29.md`
- Only executes if user requested backup in Step 28

## Workflow — Restore Mode

### Restore: Reload a Backed-Up Demo
- **Mode**: `agentic`
- **Trigger**: `restore custom demo`
- **Instructions**: Read `steps/step_restore.md`

## Workflow — Clean Mode

### Clean: Safe Demo Teardown
- **Mode**: `agentic`
- **Trigger**: `clean custom demo` or `reset custom demo`
- **Instructions**: Read `steps/step_clean.md`

## Workflow — Backup Mode

### Backup: Export Demo State On Demand
- **Mode**: `agentic`
- **Trigger**: `backup custom demo`
- **Instructions**: Read `steps/step_backup.md`

## Output

**Desktop-only mode produces:**
- `amazon-quick-features.pptx` — 8-slide features presentation
- `amazon-quick-features.html` — Interactive HTML features explorer
- `demo-script.md` — Full demo walkthrough (Acts 1–5)
- `demo-script.docx` — Word version
- `sample-data-*.csv` — 10K row dataset
- `sample-data-*-enrichment.txt` — Dataset enrichment metadata
- Knowledge Graph: 40-50 entities, 60-80 relationships
- Activity Feed: 11-13 items + Day Plan

**Full Platform mode additionally produces:**
- Strategy PPTX (6-8 slides)
- Project Tracker XLSX (2 sheets)
- Project Brief DOCX (2-3 pages)
- Extended demo script with Quick Web acts 6-10

## Lessons Learned

### Do
- Use relative time references everywhere (this week, next month, recently)
- Dispatch dataset, presentation, and Space documents in parallel — they're independent
- Ground all demo prompts in the actual storyline (characters, projects, data columns)
- Create Activity Feed items in correct order: filler → Day Plan → demo-critical (last = top)
- Include the `> This section can be skipped` note on every Quick Web act
- Validate dataset has positive trend (newer dates = higher measure values)
- Always confirm brand colours with the user before applying them
- Run KG pre-flight check even if the state appears clean
- Default email integration prompts to "draft" mode — never auto-send during a demo
- Include cleanup notes (⚠️) for any live integration actions (calendar events, Slack/Teams posts)
- Track every created item in the manifest incrementally (not just at the end)
- Delete KG edges before entities during cleanup (avoids orphaned references)

### Don't
- Don't use hardcoded dates — no years, no quarter numbers, no month names
- Don't read step files ahead of time — only read when executing that step
- Don't convert to DOCX until ALL content appends are complete
- Don't use real org names (except the target customer) — invent fictitious ones
- Don't proceed if KG pre-flight fails — the user must restart the app
- Don't skip the enrichment file validation (the addDateTime formula is critical)
- Don't create fewer than 10,000 dataset rows — validation will fail
- Don't hard-delete feed items — use resolve_feed_item (collapse, don't destroy)
- Don't clean without a manifest — offer manual cleanup as alternative

### Common Failures
- **KG FTS corruption**: Pristine QuickSwitch states can have orphaned FTS rows. Step 9b detects and repairs. If repair fails, only an app restart resolves it.
- **Dataset trend validation**: If measures don't show positive trend, the slope factor in generation was too small relative to noise. Increase slope.
- **DOCX conversion timing**: Converting before all content is appended produces an incomplete document. The script is the last heavy-write step.
- **Feed item ordering**: Creating demo-critical items first puts them at the bottom. Always create filler first.
- **Sub-task missing context**: If sub-task objective doesn't include ALL parameters (colours, schema, filenames), it will use defaults that don't match the storyline.
- **Manifest not found during cleanup**: Demo was created before manifest tracking was added, or manifest was manually deleted. Offer manual cleanup (clear all KG + feed) as fallback.
- **KG entity already deleted**: If user manually deleted a KG entity during the demo, cleanup will see a failure for that ID. This is expected — log and continue.

### When to Ask the User
- Target type (Customer vs Industry) — always ask, never assume
- Demo scope (Desktop vs Full Platform) — always ask
- Brand colour confirmation — show discovered colours, let user confirm or override
- Backup location — if user wants backup, ask where to save
- Use case notes — open-ended, user may have specific scenarios to include or exclude
- Cleanup confirmation — always show what will be deleted before proceeding
- Post-demo conversations — present the list and let user choose (never auto-delete conversations)
- Integration selection — always ask which integrations to showcase (Step 8b), never auto-detect
