### Step 17: Populate Activity Feed
- **Mode**: `agentic`
- **Tools**: `update_feed`, `publish_day_plan` (from loaded activity_feed skill)
- **Input**: Storyline from Step 11 + Activity Feed plan
- **Output**: Populated Activity Feed with realistic items + Day Plan card

## ⚠️ CRITICAL — No hardcoded date references.

**Quantity requirement: 11-13 total feed items (including Day Plan)**

**Ordering & priority rules:**
- The **top 3 items** (created LAST) MUST be the demo-critical items for Acts 1-3
- Before those, create **7-9 background filler items**
- Include a **Day Plan card** using `publish_day_plan`

**Background filler items should include:**
- Slack messages from supporting cast about project updates
- Emails about administrative topics
- Mix of importance levels (mostly `fyi`, one `important`)
- Each should have at least one CTA choice button
- Content should reference real storyline characters/projects

**Day Plan card:** Use `publish_day_plan` with:
- The meeting from the demo storyline (Act 2 trigger)
- 2-3 other fictional meetings
- At least 1 recommendation

**Creation order (IMPORTANT — feed shows most recent on top):**
1. First: Create 7-9 background filler items
2. Then: Publish the Day Plan card
3. Last: Create the 3 demo-critical items (so they appear at TOP)

The feed items ARE the data source for demo acts 1-3.

## 📋 Manifest Tracking (REQUIRED)

After each `update_feed` call, capture the returned event ID from the response.
After `publish_day_plan`, set `day_plan_published` to true in the manifest.

After ALL feed operations in this step are complete, update the manifest:
```python
import json
manifest = json.load(open(MANIFEST_PATH))
manifest["feed_event_ids"].extend(captured_event_ids)
manifest["day_plan_published"] = True
json.dump(manifest, open(MANIFEST_PATH, "w"), indent=2)
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 17b (Pre-Write File Safety Check), then Step 18.
