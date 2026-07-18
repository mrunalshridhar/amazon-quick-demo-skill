### Step 29: Create Portable Backup
- **Mode**: `agentic`
- **Input**: User requested backup
- **Output**: Backup folder with all artifacts + state data

**Step 29a — Ask save location:**
> "Where would you like me to save the backup? I'll create a folder called `demo-backup-<customer/industry>/` containing all your demo files and state data.
>
> You can specify a path (e.g., ~/Desktop, ~/Documents) or I'll save it to this conversation's files where you can download it from the sidebar."

Wait for user response. If no local folders are allowed or user says "here"/"default", save to the current session workspace at `artifacts/demo-backup/`.

**Step 29b — Create backup contents:**

1. **Copy all artifact files** into the backup folder
2. **Export Knowledge Graph** using `run_python` with `kg_search` tools:
   ```python
   # Search all entities
   # For each entity, get full details via kg_expand
   # Save as knowledge-graph.json in kg_add format
   ```
3. **Export Activity Feed** using `list_recent_feed_items`:
   ```python
   # Get all feed items
   # Save as activity-feed.json in update_feed format
   ```
4. **Create manifest.json:**
   ```json
   {
     "version": "1.0",
     "created_at": "<ISO timestamp>",
     "customer": "<customer name or null>",
     "industry": "<industry>",
     "scope": "<desktop or full_platform>",
     "brand_colours": {<BRAND_COLOURS or null>},
     "files": ["<list of all files>"],
     "kg_entity_count": <N>,
     "kg_edge_count": <N>,
     "feed_item_count": <N>
   }
   ```

**Step 29c — Confirm:**
> "✅ Backup created at `[path]`. To restore this demo later, say **'restore custom demo'** and point me to this backup folder."

The workflow is now COMPLETE.
