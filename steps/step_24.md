### Step 24: Wait for Presentation Task (BLOCKING GATE)
- **Mode**: `deterministic`
- **Tool**: `get_task_result` (using `PRESENTATION_TASK_ID`)
- **Input**: Background task thread_id from Step 13
- **Output**: Confirmation that `amazon-quick-features.pptx` and `.html` were generated

**⚠️ BLOCKING GATE — Do NOT proceed until this passes.**

Call `get_task_result` with `PRESENTATION_TASK_ID`. Check status:
- **completed**: Gate passes. Verify files exist at `DEMO_ARTIFACT_PATH`.
- **running**: Wait 20 seconds, poll again. Maximum 15 retries.
- **failed**: Fall back to inline generation (load amazon_quick_guide + canvas_pptx skills).

**Post-completion verification:**
1. Call `folder_list` on `DEMO_ARTIFACT_PATH`
2. Verify `amazon-quick-features.pptx` exists
3. Verify `amazon-quick-features.html` exists
4. If missing, search sub-task workspace and copy.

## 📋 Manifest Tracking (REQUIRED)

After confirming presentation files exist, append their filenames to the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["artifact_files"].append("amazon-quick-features.pptx")
manifest["artifact_files"].append("amazon-quick-features.html")
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 25 (or Step 26 if Desktop-only).
