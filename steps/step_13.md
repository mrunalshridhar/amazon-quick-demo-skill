### Step 13: Dispatch Presentation Task
- **Mode**: `deterministic`
- **Tool**: `start_task`
- **Input**: Demo target info + `BRAND_COLOURS` + `DEMO_ARTIFACT_PATH`
- **Output**: Running background task for features presentation

Call `start_task` with:
- `tools`: `"all"`
- `mode`: `"continue_then_receive"`
- `share_workspace`: `true`

**Objective:** Include the sub-task instructions from `sub-tasks/presentation-generation.md` in the objective, along with:
- Customer name (or "N/A")
- Industry name
- Brand colours (from Step 9, or industry-appropriate fallback)
- Output path (DEMO_ARTIFACT_PATH)
- Output filenames: `amazon-quick-features.pptx` and `amazon-quick-features.html`

Store the task's thread_id as `PRESENTATION_TASK_ID`.

**⚠️ DO NOT STOP HERE.** Proceed to Step 14.
