### Step 26: Convert Demo Script to DOCX
- **Mode**: `deterministic`
- **Tool**: `run_javascript` (using prepackaged conversion script)
- **Input**: The complete markdown file at `DEMO_ARTIFACT_PATH/demo-script.md`
- **Output**: Word document at `DEMO_ARTIFACT_PATH/demo-script.docx`

**⚠️ PRE-CONDITION: ALL content steps must be complete (Steps 18, 19, 22, and 23 if applicable).**

Execute by calling `run_javascript`:
1. Set session variables:
   ```javascript
   session.MD_INPUT_PATH = '<DEMO_ARTIFACT_PATH>/demo-script.md';
   session.DOCX_OUTPUT_PATH = WORKSPACE_DIR + '/artifacts/demo-script.docx';
   ```
2. Run the converter script file: `scripts/md_to_docx_converter.js`
3. Copy the output DOCX to `DEMO_ARTIFACT_PATH/demo-script.docx` using `file_copy`

**⚠️ DO NOT use `run_python_with_write` for this conversion.**

## 📋 Manifest Tracking (REQUIRED)

After confirming the DOCX was created, append the filename to the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["artifact_files"].append("demo-script.docx")
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 27.
