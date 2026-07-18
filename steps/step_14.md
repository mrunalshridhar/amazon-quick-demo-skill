### Step 14: Dispatch Space Documents Task
- **Mode**: `deterministic`
- **Tool**: `start_task`
- **Input**: Storyline (characters, projects) + `BRAND_COLOURS` + `DEMO_ARTIFACT_PATH`
- **Output**: Running background task for Space documents
- **Skip if**: `DEMO_SCOPE == "desktop"` — proceed directly to Step 15

Call `start_task` with:
- `tools`: `"all"`
- `mode`: `"continue_then_receive"`
- `share_workspace`: `true`

**Objective:** Include the sub-task instructions from `sub-tasks/space-documents.md` in the objective, along with:
- Customer name, industry name
- Central character + supporting cast (names, titles)
- Key projects from storyline
- Brand colours
- Output path (DEMO_ARTIFACT_PATH)
- Key metrics and status information from the storyline

Store the task's thread_id as `SPACE_DOCS_TASK_ID`.

**⚠️ DO NOT STOP HERE.** Proceed to Step 15.
