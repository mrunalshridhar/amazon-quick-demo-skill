### Step 1c: Initialize Demo Manifest
- **Mode**: `deterministic`
- **Tool**: `file_write`
- **Input**: `TARGET_NAME`, `INDUSTRY_NAME`, `DEMO_SCOPE`, `BRAND_COLOURS`, `DEMO_ARTIFACT_PATH`
- **Output**: `MANIFEST_PATH` = `DEMO_ARTIFACT_PATH/demo-manifest.json`
- **Validate**: File written successfully with valid JSON
- **On failure**: Retry write; if path doesn't exist, ensure DEMO_ARTIFACT_PATH was resolved correctly

**Purpose:** The manifest tracks every item created during demo building so that `clean custom demo` can safely remove only what was created — leaving the user's other data untouched.

**Action:** Write `DEMO_ARTIFACT_PATH/demo-manifest.json` with this initial structure:

```json
{
  "demo_name": "<TARGET_NAME>",
  "industry": "<INDUSTRY_NAME>",
  "scope": "<DEMO_SCOPE>",
  "created_at": "<current ISO timestamp>",
  "brand_colours": <BRAND_COLOURS object or {}>,
  "kg_entity_ids": [],
  "kg_edge_ids": [],
  "feed_event_ids": [],
  "artifact_files": [],
  "day_plan_published": false
}
```

Store the full path as `MANIFEST_PATH` for use in subsequent steps.

**⚠️ DO NOT STOP HERE.** Proceed to Step 9 (or Step 9b if Industry target).
