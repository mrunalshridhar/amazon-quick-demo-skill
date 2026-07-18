### Step 25: Wait for Space Documents Task (BLOCKING GATE)
- **Mode**: `deterministic`
- **Tool**: `get_task_result` (using `SPACE_DOCS_TASK_ID`)
- **Input**: Background task thread_id from Step 14
- **Output**: Confirmation that Space documents were generated
- **Skip if**: `DEMO_SCOPE == "desktop"` — proceed to Step 26

**⚠️ BLOCKING GATE — Do NOT proceed until this passes.**

Call `get_task_result` with `SPACE_DOCS_TASK_ID`. Check status:
- **completed**: Gate passes. Verify files exist at `DEMO_ARTIFACT_PATH`.
- **running**: Wait 20 seconds, poll again. Maximum 15 retries.
- **failed**: Report failure but continue (Space documents are enhancement, not critical).

**Post-completion verification:**
Expected files (exact names come from the storyline — typically):
- A strategy PPTX file
- A project tracker XLSX file
- A project brief DOCX file

If missing from `DEMO_ARTIFACT_PATH`, search sub-task workspace and copy.

## 📋 Manifest Tracking (REQUIRED)

After confirming Space document files exist, append their filenames to the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
# Append only the files that actually exist
for filename in space_doc_filenames:
    manifest["artifact_files"].append(filename)
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 26.
