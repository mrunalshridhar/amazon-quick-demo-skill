### Step 0: First-Run Overview (Welcome Page)
- **Mode**: `deterministic`
- **Tool**: `file_read`, `open_in_session_tab`
- **Input**: Check if `DEMO_ARTIFACT_PATH/demo-manifest.json` exists
- **Output**: Overview HTML displayed (first run only) or skipped (returning user)
- **Skip if**: `demo-manifest.json` already exists at `DEMO_ARTIFACT_PATH` — this means a demo has been created before and the user knows the skill

## Purpose

On first use, this step displays the skill overview page — a polished HTML guide explaining what the skill does, how the 4 modes work, the demo flow, getting started instructions, and lifecycle operations. This helps new users understand the full scope before they answer any questions.

## Procedure

**After Step 1b** (once `DEMO_ARTIFACT_PATH` is resolved):

1. Check if `DEMO_ARTIFACT_PATH/demo-manifest.json` exists
2. **If it exists** → this is a returning user. Skip this step, proceed to Step 2.
3. **If it does NOT exist** → this is a first run. Do the following:

**Display the overview:**
- Read `<skill_directory>/resources/skill-overview.html`
- Copy it to `DEMO_ARTIFACT_PATH/skill-overview.html`
- Open it with `open_in_session_tab` (title: "Custom Demo Creation — Overview")
- Print a brief message:
  > "👋 Welcome! I've opened the skill overview in a tab — it covers what this skill builds, how to use it, and getting started guidance. Take a look, then we'll begin."

**Then proceed** to Step 2 (verify placeholder files) and continue the normal flow.

## Notes
- The overview HTML is at `<skill_directory>/resources/skill-overview.html`
- It is only shown ONCE per environment — once a manifest exists, it's never shown again
- The copy to DEMO_ARTIFACT_PATH also serves as a reference the user can reopen later
- Do NOT wait for user acknowledgment — show it and continue to the next step

**⚠️ DO NOT STOP HERE.** Proceed to Step 2.
