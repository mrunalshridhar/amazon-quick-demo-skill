### Step 12: Derive Filenames and Dispatch Dataset Task
- **Mode**: `deterministic`
- **Tool**: `start_task`
- **Input**: Demo target info + dataset schema from storyline + `DEMO_ARTIFACT_PATH`
- **Output**: Running background task for dataset generation

**Step 12a — Derive exact filenames:**
1. Take the customer name (if applicable) and industry name
2. Convert to lowercase, replace spaces with hyphens, remove special characters
3. Construct:
   - `EXPECTED_CSV_FILENAME` = `sample-data-<formatted-customer>-<formatted-industry>.csv`
   - `EXPECTED_ENRICHMENT_FILENAME` = same base + `-enrichment.txt`

**Step 12b — Dispatch dataset generation task:**

Call `start_task` with:
- `tools`: `"all"`
- `mode`: `"continue_then_receive"`
- `share_workspace`: `true`

**Objective:** Read the sub-task instructions from `sub-tasks/dataset-generation.md` and include them verbatim in the objective, along with:
- Customer/Industry name
- Output path (DEMO_ARTIFACT_PATH)
- Expected filenames
- Complete dataset schema (all 8 dimensions with category values, 3 measures with ranges)

Store the task's thread_id as `DATASET_TASK_ID`.

**⚠️ DO NOT STOP HERE.** Proceed to Step 13.
