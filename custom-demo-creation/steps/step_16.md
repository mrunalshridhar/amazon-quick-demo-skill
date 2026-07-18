### Step 16: KG Enrichment (Graph Density)
- **Mode**: `agentic`
- **Tools**: `kg_add`
- **Input**: Confirmed industry/company + KG entities from Step 15
- **Output**: Additional KG entities and edges creating a richer, more interconnected graph

**Purpose:** The storyline KG entries from Step 15 create a small, focused graph. This step adds broader context to make the Knowledge Graph look like a realistic neural network with multiple clusters and cross-connections.

**What to add (30-50 additional entities + 50+ new edges):**

- **Industry context (8-10 entities)**: Regulatory bodies, industry standards, professional associations, market frameworks
- **Organizational depth (6-8 entities)**: Additional departments, working groups, internal platforms, shared services
- **Peripheral people (6-8 entities)**: HR contacts, IT support, vendor contacts, advisory board members
- **Adjacent projects (4-6 entities)**: Projects the character is aware of but not directly involved in, past completed initiatives
- **External ecosystem (6-8 entities)**: Industry partners, analyst firms, conference events, consulting firms
- **Historical context (4-6 entities)**: Past initiatives, legacy systems being replaced

**Edge creation strategy:**
- Connect new entities to BOTH existing storyline entities AND to each other
- At least 2-3 edges per new entity
- Varied relationship types
- Create multiple clusters with cross-cluster bridges
- At least 3 bridge nodes connecting different clusters

**Graph topology goal:** 45-65+ total entities, 75-100+ total edges, 5-6 distinct clusters.

## 📋 Manifest Tracking (REQUIRED)

After each `kg_add` call, capture the returned IDs:
- Entity IDs → from `result["ids"]` dict values
- Edge IDs → from `result["edge_ids"]` list (if present)

After ALL kg_add calls in this step are complete, update the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["kg_entity_ids"].extend(new_entity_ids)
manifest["kg_edge_ids"].extend(new_edge_ids)
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 17.
