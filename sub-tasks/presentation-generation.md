# Presentation Generation Sub-Task

You are generating the Amazon Quick features presentation (PPTX + interactive HTML) for a custom demo.

## Parameters (provided in objective)
- CUSTOMER_NAME, INDUSTRY_NAME
- BRAND_COLOURS (primary, accent, dark, text hex codes)
- OUTPUT_PATH
- Output filenames: `amazon-quick-features.pptx` and `amazon-quick-features.html`

## Step 1: Load Required Skills
Call `load_skill("amazon_quick_guide")` to get current feature information.
Call `load_skill("canvas_pptx")` for presentation building instructions.

## Step 2: Organize Features

Split into TWO main sections:

**Quick Desktop:**
- Communication & Knowledge (cross-channel synthesis, email/meeting prep, KG, semantic search, memory, local-first)
- Automation & Intelligence (scheduled agents, deep research, parallel orchestration, document authoring, data queries)

**Quick Web:**
- Spaces & Knowledge (unified knowledge hub, documents/datasets/dashboards, team sharing)
- Chat Agents & Flows (custom AI personas, multi-step workflows, step types)
- Research & Generate Analysis (deep research with citations, NL → dashboards)
- Apps (NL → custom web apps, iterate via chat, share/publish)

## Step 3: Build PPTX (8 slides)

Use pptxgenjs. Apply BRAND_COLOURS throughout:

- **Slide 1 — Title**: "Amazon Quick — Intelligent Work Platform" + customer/industry subtitle
- **Slide 2 — Desktop: Communication & Knowledge**: 6 features in card/grid layout
- **Slide 3 — Desktop: Automation & Intelligence**: 5-6 features
- **Slide 4 — Web: Spaces & Knowledge**: Features + highlight box
- **Slide 5 — Web: Chat Agents & Flows**: 2-column layout
- **Slide 6 — Web: Research & Generate Analysis**: 2-column
- **Slide 7 — Web: Apps**: Feature grid
- **Slide 8 — Value Proposition**: Key takeaways + stats

**Design:** Use BRAND_COLOURS for backgrounds, headers, accents. Professional typography (Georgia/Calibri). Speaker notes on every slide with customer-specific talking points.

## Step 4: Build Interactive HTML

Create a single-file HTML page with:
- Category filter tabs (Desktop, Web, All)
- Feature cards with expandable details
- Search functionality
- Responsive design
- Apply BRAND_COLOURS to the theme
- Self-contained (all CSS/JS inline)

## Step 5: Validate + Complete

Verify both files exist at OUTPUT_PATH and are non-empty. Call `complete`.
