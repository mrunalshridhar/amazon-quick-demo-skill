### Step 18: Generate Demo Script — Part 1 (Acts 1-4)
- **Mode**: `agentic`
- **Tools**: `file_write`
- **Input**: Full storyline + populated KG + populated Activity Feed
- **Output**: Demo script covering Acts 1-4 and the Dataset Q&A section header

Generate the demo script with this structure and save to `DEMO_ARTIFACT_PATH/demo-script.md`:

```markdown
# [Customer/Industry] Demo Script

## Setup & Context
- Demo persona description
- Overview of the narrative arc

## Act 1: [Email Response]
### What the audience sees:
### Demo Action:
### Expected Result: (FULL response written out)
### Talking Points:

## Act 2: [Meeting Prep]
(same structure)

## Act 3: [Slack Response]
(same structure)

## Act 4: [KG Showcase]
(Focus, Summarize, Ask — with full expected results)

## [Optional] Act 5: Dataset Q&A & Visualization
```

**CRITICAL RULES:**
1. Write out FULL expected responses — no placeholders
2. Every fact in expected results must trace to a feed item or KG entity
3. Prompts must be natural (what a real user would type)
4. End after the Act 5 section header — do NOT write setup instructions (those come in Step 19)

## 📋 Manifest Tracking (REQUIRED)

After writing the file, append the filename to the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["artifact_files"].append("demo-script.md")
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 19.
