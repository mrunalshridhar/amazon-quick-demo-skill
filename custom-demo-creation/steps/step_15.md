### Step 15: Populate Knowledge Graph
- **Mode**: `agentic`
- **Tools**: `kg_add` (from loaded knowledge_graph skill)
- **Input**: Storyline from Step 11
- **Output**: Populated knowledge graph with entities and relationships

## ⚠️ CRITICAL — No hardcoded date references.

Create KG entities for ALL characters and projects in the storyline:

1. **People entities**: Central character + all supporting cast. Include name, role/title, department, company.
2. **Project entities**: Any projects, initiatives, or workstreams mentioned in the storyline.
3. **Organization entities**: Teams, departments, companies (use real customer name, fictitious for others).
4. **Event entities**: Meetings, deadlines, milestones referenced in the scenarios.
5. **Relationships**: Connect all entities with meaningful edges (worksFor, manages, memberOf, relatedTo, isPartOf, dependsOn, attendee, organizer, about, etc.)

Use `kg_add` with both `nodes` and `edges` parameters. Ensure every edge has a `reason` in properties.

**Target**: At least 8 people, 3-5 projects, 4-6 organisations, 2-3 events, with 25+ edges connecting them.

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

**⚠️ DO NOT STOP HERE.** Proceed to Step 16.
