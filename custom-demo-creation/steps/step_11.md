### Step 11: Create Storyline
- **Mode**: `agentic`
- **Input**: Confirmed demo target from Step 6 + demo scope from Step 7 + use case notes from Step 8 + schema knowledge from Step 10
- **Output**: A detailed storyline document

## ⚠️ CRITICAL — No hardcoded date references.
Use relative references only (this week, next month, 2 weeks from now, next quarter, etc.)

Build a complete demo storyline that includes:

1. **Central Character** — A fictitious person (realistic name, job title, department) who will be the demo persona. NOT the user — a character the user "plays."

2. **Supporting Cast** — 4-8 other fictitious characters who interact with the central character (managers, team members, cross-functional partners, external contacts).

3. **Scenario Narratives** — For each demo act, write a detailed narrative including:
   - The specific situation/trigger
   - What data exists across channels (emails, Slack messages, meetings)
   - What the demo prompt will be
   - What the expected output should cover

4. **Dataset Schema** — Define the columns for the sample dataset:
   - 8 dimension columns (categorical — with specific category values listed)
   - 3 measure columns (numerical — with descriptions and ranges)
   - 1 date_offset column (integer, -730 to 0)
   - The dataset should be relevant to the target industry/customer

5. **Activity Feed Plan** — List exactly which items should appear in the Activity Feed

6. **Quick Web Plan** (ONLY if `DEMO_SCOPE == "full_platform"`):
   - Chat Agent persona description + name
   - Flow description + prompt to generate it
   - Research prompt
   - Generate Analysis prompt
   - Apps prompt (include customer `BRAND_COLOURS` if available)
   - What documents to create for the Space (PPTX strategy deck, XLSX project tracker, DOCX project brief)
