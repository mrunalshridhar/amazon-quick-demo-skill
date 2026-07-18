### Step 20: Wait for Dataset Task (BLOCKING GATE)
- **Mode**: `deterministic`
- **Tool**: `get_task_result` (using `DATASET_TASK_ID`)
- **Input**: Background task thread_id from Step 12
- **Output**: Confirmation that dataset and enrichment files were generated

**⚠️ BLOCKING GATE — Do NOT proceed until this passes.**

Call `get_task_result` with `DATASET_TASK_ID`. Check status:
- **completed**: Gate passes. Proceed to Step 21.
- **running**: Wait 20 seconds, poll again. Repeat.
- **failed**: Attempt inline generation using `run_python_with_write`.

**Maximum retries:** Poll up to 15 times (5 minutes). If not completed, fall back to inline generation.

**Post-completion:** Verify files exist at `DEMO_ARTIFACT_PATH`. If missing, search for them in the sub-task's workspace and copy them over.

## 📋 Manifest Tracking (REQUIRED)

After confirming dataset files exist, append their filenames to the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["artifact_files"].append(CSV_FILENAME)
manifest["artifact_files"].append(ENRICHMENT_FILENAME)
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 21.
