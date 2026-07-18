### Restore Mode — Complete Instructions
- **Trigger**: "restore custom demo"
- **Mode**: `agentic`

When the user says "restore custom demo", execute the following:

**Step R1: Find Demo Readme + Ask for Backup Location**
1. Search for the "Demo Readme" conversation (same as Step 1 in create mode)
2. If not found, STOP with the standard prerequisite error
3. Ask: "Where is your demo backup folder? Provide the path or say 'this conversation' if you uploaded it here."

**Step R2: Validate Backup**
1. Read `manifest.json` from the specified path
2. Verify it contains: version, customer/industry, files list, KG/feed counts
3. Print summary: "Found backup for [customer/industry], created [date]. Contains [X] files, [X] KG entities, [X] feed items."
4. Ask: "Shall I restore this?"

**Step R3: Copy Files to Demo Readme Artifacts**
1. Resolve `DEMO_ARTIFACT_PATH` (same as Step 1b in create mode)
2. Copy all files listed in manifest to `DEMO_ARTIFACT_PATH`
3. Verify all files are present

**Step R4: Repopulate Knowledge Graph**
1. Load `knowledge_graph` skill
2. Run KG pre-flight check (same as Step 9b)
3. Read `knowledge-graph.json`
4. Call `kg_add` with the entities and edges (may need to batch)
5. Verify with `kg_stats`

**Step R5: Repopulate Activity Feed**
1. Load `activity_feed` skill
2. Read `activity-feed.json`
3. Call `update_feed` for each item (respecting creation order: filler first, Day Plan, demo-critical last)
4. Call `publish_day_plan` if present in the backup

**Step R6: Confirm**
Print:
> ✅ **Demo Restored Successfully**
>
> - **Files:** [X] artifacts restored to Demo Readme
> - **Knowledge Graph:** [X] entities, [X] edges
> - **Activity Feed:** [X] items
>
> Go to the **Demo Readme** conversation and ask "show me all available files" to verify.
> Take a **QuickSwitch snapshot** to preserve this restored state.
