### Step 17b: Pre-Write File Safety Check
- **Mode**: `deterministic`
- **Tool**: `run_python` with `tools=["folder_list", "file_move"]`
- **Input**: `DEMO_ARTIFACT_PATH`, current demo name from Step 6
- **Output**: Any existing shared-name files renamed to preserve them
- **Execute**: BEFORE Steps 18, 26, and before sub-task outputs are written to DEMO_ARTIFACT_PATH

## Purpose

Shared-name files (`demo-script.md`, `demo-script.docx`, `amazon-quick-features.pptx`, `amazon-quick-features.html`) are the same filenames regardless of which demo is being built. If a previous demo already created these files, writing new ones would overwrite the old versions permanently.

This step renames any existing shared-name files with the previous demo's name prefix, preserving them before the new demo writes its versions.

## Procedure

1. **Check if a previous manifest exists:**
   - Read `DEMO_ARTIFACT_PATH/demo-manifest.json` (if it exists)
   - Extract `demo_name` field → this is the PREVIOUS demo's name
   - If no manifest exists, check for the existence of shared-name files anyway

2. **Identify existing shared-name files:**
   ```python
   SHARED_FILENAMES = [
       "demo-script.md",
       "demo-script.docx",
       "amazon-quick-features.pptx",
       "amazon-quick-features.html",
   ]
   ```

3. **For each existing shared-name file:**
   - Derive a safe prefix from the previous demo name (lowercase, hyphens, no special chars)
   - Rename: `demo-script.md` → `<prefix>-demo-script.md`
   - Example: If previous demo was "HSE", rename to `hse-demo-script.md`
   - Use `file_move` for each rename

4. **Log results:**
   - Print which files were renamed and their new names
   - If no shared-name files exist, print "No existing files to preserve" and proceed

## Example

Previous demo: "HSE Healthcare"
New demo: "Public Health Sector"

Before writing new files:
```
demo-script.md          → hse-healthcare-demo-script.md
demo-script.docx        → hse-healthcare-demo-script.docx
amazon-quick-features.pptx → hse-healthcare-amazon-quick-features.pptx
amazon-quick-features.html → hse-healthcare-amazon-quick-features.html
```

Now the new demo can safely write `demo-script.md` etc. without losing the HSE versions.

## Edge Cases

- **No previous manifest but files exist:** Use filename heuristics or prefix with `previous-`
- **Previous manifest has same demo_name as current:** This means the user is re-running the same demo — overwriting is intentional. Skip renaming.
- **Renamed file already exists** (e.g., `hse-demo-script.md` already there): Append a number suffix: `hse-demo-script-2.md`

## ⚠️ TIMING NOTE — Sub-Task Outputs

Step 17b runs BEFORE the main script writes `demo-script.md/docx`. However, sub-tasks
(Steps 12-14) are dispatched earlier and their outputs (`amazon-quick-features.*`,
Space documents) may land at any time.

To handle this safely:
1. **Step 17b renames all 4 shared-name files** that exist at the time it runs
2. **After sub-tasks complete (Steps 20, 24, 25):** Before copying sub-task outputs
   to DEMO_ARTIFACT_PATH, the parent agent MUST check if a file with the same name
   already exists (from a previous demo) and rename it with the previous demo's prefix
   if so. This applies to:
   - `amazon-quick-features.pptx` and `amazon-quick-features.html` (from Step 13/24)
   - Space documents with the same name (from Step 14/25) — less likely since these
     have customer-prefixed filenames, but check anyway
3. If the sub-task writes DIRECTLY to DEMO_ARTIFACT_PATH (shared workspace), the
   sub-task instructions must include: "If the file already exists, DO NOT overwrite."

## ⚠️ DO NOT STOP HERE. Proceed to Step 18.
