### Step 23: Generate Quick Web Demo Script (Acts 6-10)
- **Mode**: `agentic`
- **Tool**: `file_edit`
- **Input**: Storyline Quick Web plan + `BRAND_COLOURS` + Space documents info
- **Output**: Quick Web demo acts appended to the demo script
- **Skip if**: `DEMO_SCOPE == "desktop"` — proceed to Step 24

Read `resources/quick-web-features.md` for reference on each capability's description and usage.

Append to `DEMO_ARTIFACT_PATH/demo-script.md` a new section:

```markdown
---

# Part 2: Amazon Quick Web Capabilities

> **Transition:** After Desktop (Acts 1-5), open your browser. These sections can be shown or skipped based on audience interest.

## Act 6: Spaces (Knowledge Hub)
> *This section can be skipped if not relevant to the audience.*
### Prep Steps:
### Demo Prompts:
### Talking Points:

## Act 7: Chat Agents & Flows
> *This section can be skipped if not relevant to the audience.*
### Chat Agent Setup:
### Flow Setup:
### Demo Prompts:
### Talking Points:

## Act 8: Quick Research
> *This section can be skipped if not relevant to the audience.*
### Demo Prompt:
### What to Expect:
### Talking Points:

## Act 9: Generate Analysis
> *This section can be skipped if not relevant to the audience.*
### Demo Action:
### Demo Prompt:
### What to Expect:
### Talking Points:

## Act 10: Apps
> *This section can be skipped if not relevant to the audience.*
### Demo Prompt:
### Iteration Prompts: (include customer BRAND_COLOURS)
### What to Expect:
### Talking Points:

## Closing Summary Table
```

**RULES:**
- Every prompt must be specific to the customer/industry storyline
- Chat Agent persona must reference the storyline characters and projects
- Flow must query the Space with storyline-relevant content
- Research prompt must relate to the customer's industry
- Generate Analysis prompt must reference actual dataset columns
- Apps prompt must describe an app relevant to the storyline projects
- Include customer `BRAND_COLOURS` in the Apps iteration prompt
- Mark EVERY Quick Web section with the skippable note

**⚠️ DO NOT STOP HERE.** Proceed to Step 24.
