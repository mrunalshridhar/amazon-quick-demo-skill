### Clean Mode: Safe Demo Teardown
- **Mode**: `agentic`
- **Trigger**: `clean custom demo` or `reset custom demo`
- **Input**: Demo manifest at `DEMO_ARTIFACT_PATH/demo-manifest.json`
- **Output**: All demo-created items removed; environment ready for a new demo

## Prerequisites
Same as Create mode: Must have "Demo Readme" conversation (QuickSwitch state).

## Procedure

### C1: Find and Read Manifest

1. Load the `conversation_management` skill.
2. Search for "Demo Readme" conversation using `search_conversations(query="Demo Readme")`.
3. Resolve `DEMO_ARTIFACT_PATH` (same logic as Steps 1/1b in Create mode).
4. Read `DEMO_ARTIFACT_PATH/demo-manifest.json`.

**If manifest not found:**
> "⚠️ No demo manifest found at the expected location. This means either no demo was created with the tracked workflow, or the manifest was already deleted. I cannot safely determine what to clean without a manifest.
>
> Would you like me to help with a manual cleanup instead? (I can clear the KG and feed entirely, but this is less targeted.)"

Stop and wait for user response. Do NOT proceed with automated cleanup without a manifest.

### C2: Show Cleanup Summary and Confirm

Read the manifest and present a summary:

> **Demo cleanup summary for "[demo_name]" ([industry]):**
> | Item | Count |
> |------|-------|
> | Knowledge Graph entities | [len(kg_entity_ids)] |
> | Knowledge Graph edges | [len(kg_edge_ids)] |
> | Activity Feed items | [len(feed_event_ids)] |
> | Day Plan | [will be reset / not published] |
> | Artifact files | [len(artifact_files)] |
>
> **Scope:** [scope]
> **Created:** [created_at]

Then present the confirmation decision card:

```
<decision question="Confirm cleanup? This will delete all tracked demo items and cannot be undone.">
<option description="Delete all tracked demo items (KG entities, feed items, files)">Confirm cleanup</option>
<option description="Keep everything as-is">Cancel</option>
</decision>
```

If user selects **Cancel** — stop immediately. Print "Cleanup cancelled. Demo remains intact."

### C3: Delete KG Edges and Entities

Load the `knowledge_graph` skill if not already loaded.

**Delete edges FIRST** (before entities, to avoid orphaned references):
```python
import json

manifest = json.load(open(MANIFEST_PATH))
edge_failures = 0
for edge_id in manifest["kg_edge_ids"]:
    try:
        kg_edit(delete=edge_id)
    except Exception:
        edge_failures += 1

entity_failures = 0
for entity_id in manifest["kg_entity_ids"]:
    try:
        kg_edit(delete=entity_id)
    except Exception:
        entity_failures += 1
```

Use `run_python` with `tools=["kg_edit"]` to batch-process these in a loop.

**Log results:**
- Print: "KG cleanup: [X] entities deleted, [Y] edges deleted ([Z] failures — likely already deleted)"
- Failures are expected if items were manually deleted earlier — this is not an error.

### C4: Remove Feed Items

Load the `activity_feed` skill if not already loaded.

For each event_id in `manifest["feed_event_ids"]`:
```python
resolve_feed_item(event_id=event_id, reason="Demo environment cleaned up")
```

Use `run_python` with `tools=["resolve_feed_item"]` to batch-process.

**Note:** `resolve_feed_item` marks items as resolved (collapsed behind "N resolved" toggle). They are effectively hidden from the user's active feed. This is the safest removal mechanism — it doesn't hard-delete but makes them invisible.

**Log results:**
- Print: "Feed cleanup: [X] items resolved ([Y] failures)"

### C5: Reset Day Plan

If `manifest["day_plan_published"]` is true:

Call `publish_day_plan` with an empty recommendations list:
```python
publish_day_plan(recommendations=[])
```

This publishes an empty day plan card, effectively clearing the demo-specific one. The next time the feed agent runs, it will populate a real day plan from the user's actual calendar.

Print: "Day Plan reset to empty."

### C6: Check for Post-Demo Conversations

Read `manifest["created_at"]` timestamp.

Load the `conversation_management` skill if not already loaded.

Use `search_conversations` or `query_conversations` to find conversations created AFTER that timestamp. Exclude the current conversation and "Demo Readme".

**If conversations found:**
Present the list:
> **These conversations were created after the demo was built.** They may contain demo rehearsal artifacts (drafted emails, prep notes, etc.):
>
> 1. [title 1] — created [date]
> 2. [title 2] — created [date]
> ...

Then ask:
```
<decision question="Would you like to delete these post-demo conversations too?">
<option description="Delete all listed conversations">Delete all</option>
<option description="Keep them — I'll clean up manually if needed">Keep them</option>
</decision>
```

If user selects **Delete all** — use `delete_chat` for each conversation ID.
If user selects **Keep them** — move on.

**If no conversations found:** Skip this step silently.

### C7: Delete Artifact Files

**SAFETY CHECK:** Only delete files that are still the CURRENT demo's version. If the file was
renamed by Step 17b (because a newer demo overwrote it), it won't exist under the original name
and that's OK — skip it.

For each filename in `manifest["artifact_files"]`:
```python
import os
path = f"{DEMO_ARTIFACT_PATH}/{filename}"
if os.path.exists(path):
    file_delete(path=path)
else:
    # File may have been renamed by Step 17b or already removed
    pass
```

Use `run_python` with `tools=["file_delete"]` to batch-process.

**IMPORTANT:** Do NOT attempt to delete files with the previous demo's prefix (e.g., `hse-demo-script.md`).
Those belong to the earlier demo and should be preserved.

**Log results:**
- Print: "Files cleanup: [X] artifacts deleted ([Y] not found — may have been manually removed)"

### C8: Delete Manifest and Confirm

Delete the manifest file itself:
```python
file_delete(path=MANIFEST_PATH)
```

Then print the final confirmation:

> ✅ **Demo cleaned successfully**
>
> | Item | Deleted | Failed |
> |------|---------|--------|
> | KG entities | [X] | [Y] |
> | KG edges | [X] | [Y] |
> | Feed items | [X] | [Y] |
> | Day Plan | reset | — |
> | Artifact files | [X] | [Y] |
> | Conversations | [X] | — |
>
> **Your environment is ready for a new `create custom demo`.**
>
> ⚠️ If you were using a QuickSwitch state, you can also revert to the pristine snapshot for a guaranteed clean slate.

**Workflow is COMPLETE after this step.**
