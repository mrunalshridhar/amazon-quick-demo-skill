### Step 9b: Knowledge Graph Pre-Flight Health Check
- **Mode**: `deterministic`
- **Tools**: `kg_stats`, `kg_add`, `kg_edit` (from loaded knowledge_graph skill)
- **Input**: Knowledge Graph skill loaded in Step 10
- **Output**: Confirmed healthy KG state ready for entity population
- **On failure**: Self-repair attempted; if repair fails, output warning and STOP

**Purpose:** In Pristine/fresh QuickSwitch states, the KG's FTS5 search index (`search_content` table) can have orphaned rows left over from prior state snapshots. These phantom rows cause a `UNIQUE constraint failed: search_content.node` error on every `kg_add` call, completely blocking KG population. This step detects and repairs the issue.

**Procedure:**

1. **Check for phantom nodes:**
   Call `kg_stats()`. Inspect the result:
   - If `total_entities == 0` AND `total_nodes > 0`: Orphaned FTS rows exist. Proceed to repair.
   - If `total_entities == 0` AND `total_nodes == 0`: KG is clean. Skip to smoke test.
   - If `total_entities > 0`: KG already has data. Skip to smoke test.

2. **Repair orphaned FTS rows:**
   Use `run_python` with tools `["kg_edit"]` to delete phantom entity IDs:
   ```python
   for i in range(200):
       try:
           kg_edit(delete=f"entity:{i}")
       except:
           pass
   ```
   After deletion, call `kg_stats()` again:
   - If `total_nodes` is now 0: Repair succeeded. Proceed to smoke test.
   - If `total_nodes` is still > 0: Output STOP message:
     > "⚠️ Knowledge Graph FTS index has unrepairable corruption. Please restart Amazon Quick and try again."

3. **Smoke test:**
   ```python
   result = kg_add(nodes='[{"name": "__kg_preflight_test__", "category": "DefinedTerm", "summary": "Temporary pre-flight test entity", "source_type": "local"}]')
   test_id = result["ids"]["__kg_preflight_test__"]
   kg_edit(delete=test_id)
   ```
   - If insert succeeds: KG is healthy. Print `"✅ KG pre-flight check passed"` and proceed.
   - If insert raises ConstraintError: Output the STOP message above.

**⚠️ DO NOT STOP HERE if the check passes.** Proceed to Step 11.
