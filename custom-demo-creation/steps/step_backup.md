### Backup Mode: Export Demo State On Demand
- **Mode**: `agentic`
- **Trigger**: `backup custom demo`
- **Input**: Existing demo (manifest must exist)
- **Output**: Portable backup folder

## Prerequisites
Same as Create/Clean mode: Must have "Demo Readme" conversation (QuickSwitch state).

## Procedure

**B1. Locate the demo:**
- Search for "Demo Readme" conversation (same as Step 1)
- Resolve DEMO_ARTIFACT_PATH (same as Step 1b)
- Read `DEMO_ARTIFACT_PATH/demo-manifest.json`
- If manifest not found: Stop with message:
  > "⚠️ No demo manifest found. Either no demo has been created, or it was created before manifest tracking was added. Cannot create a backup without a manifest."

**B2. Show backup summary:**
Present:
> **Backup summary for "[demo_name]":**
> - Files: [N] artifacts
> - Knowledge Graph: [X] entities, [Y] edges tracked
> - Activity Feed: [Z] items tracked
> - Created: [created_at]

**B3. Ask save location:**
> "Where should I save the backup? (Provide a folder path, or I'll save to the Demo Readme artifacts folder.)"

If user provides a path, use it. If not (or no local folders are allowed), save to `DEMO_ARTIFACT_PATH/demo-backup/`.

**B4. Create backup structure:**
```
demo-backup/
├── manifest.json          ← enhanced copy of demo-manifest.json
├── artifacts/             ← copy of all generated files
├── knowledge-graph.json   ← all demo entities + edges in kg_add format
└── activity-feed.json     ← feed items in update_feed format
```

**manifest.json:** Copy the existing demo-manifest.json and enhance with:
```json
{
  "backup_created_at": "[ISO timestamp]",
  "backup_version": "2.0",
  ... (all existing manifest fields)
}
```

**knowledge-graph.json:** For each entity ID in `kg_entity_ids`:
- Call `kg_search` or `kg_expand` to get the entity's current state (name, category, summary, properties)
- Format as a list of `kg_add`-compatible node objects
For each edge ID in `kg_edge_ids`:
- Get edge details (from, to, relation, summary)
- Format as a list of `kg_add`-compatible edge objects

Use `run_python` with tools `["kg_search"]` to batch-process entities efficiently.

**activity-feed.json:** Export feed items using `list_recent_feed_items` (from activity_feed skill), filter to only those matching IDs in `feed_event_ids`. Format as `update_feed`-compatible objects.

**Copy artifacts:** Copy all files listed in `artifact_files` from `DEMO_ARTIFACT_PATH` to `demo-backup/artifacts/`.

**B5. Confirm completion:**
> ✅ **Backup created at:** `[backup_path]`
> - [N] artifact files copied
> - [X] KG entities + [Y] edges exported
> - [Z] feed items exported
>
> To restore later: use `restore custom demo` and point to this folder.

**Workflow is COMPLETE after this step.**
