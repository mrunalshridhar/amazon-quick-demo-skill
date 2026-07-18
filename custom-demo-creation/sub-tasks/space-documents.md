# Space Documents Sub-Task

You are generating 3 documents for upload to an Amazon Quick Space in a custom demo.

## Parameters (provided in objective)
- CUSTOMER_NAME, INDUSTRY_NAME
- BRAND_COLOURS (hex codes)
- OUTPUT_PATH
- CENTRAL_CHARACTER (name, title, department)
- SUPPORTING_CAST (names, titles, relationships)
- KEY_PROJECTS (names, status, key metrics)
- KEY_METRICS (specific numbers from storyline)

## ⚠️ CRITICAL: NO hardcoded dates anywhere. Use relative references only.

## Document 1: Strategy PPTX

**Filename:** `<customer-lowercase>-<department-keyword>-strategy.pptx`
(e.g., `hse-primary-care-digital-strategy.pptx`)

**Content (6-8 slides):**
1. Title: "[Department] Strategy" for [Customer]
2. Vision & Mission
3. Key Programmes (list all projects from storyline with brief descriptions)
4. Current Status (use storyline metrics, relative timings)
5. Key Metrics (the numbers from the storyline)
6. Risks & Dependencies (from storyline scenarios)
7. Roadmap & Next Steps (relative milestones: this month, next quarter, etc.)

**Design:** Apply BRAND_COLOURS. Use pptxgenjs or canvas_pptx skill.

## Document 2: Project Tracker XLSX

**Filename:** `<customer-lowercase>-project-tracker.xlsx`

**Sheet 1 "Project Status":**
| Project Name | Lead | Status | Priority | % Complete | Target Completion | Risk Level | Notes |
Use all projects from storyline with realistic data.

**Sheet 2 "Budget Summary":**
| Project | Allocated Budget | Spent to Date | % Utilised | Remaining | Notes |
Total budget utilisation should match storyline (e.g., 67% if mentioned).
Use currency appropriate to the customer's country.

## Document 3: Project Brief DOCX

**Filename:** `<customer-lowercase>-<main-project-lowercase>-project-brief.docx`

**Content (~3 pages):**
- Project Overview (objectives, scope)
- Stakeholder Table (all storyline characters with roles)
- Current Status (key metrics, milestone progress)
- Key Risks & Mitigations (5 risks with severity/mitigation)
- Next Steps (with relative timeframes)

Professional formatting with headers, tables, clean typography.

## Validation + Complete

Verify all 3 files exist at OUTPUT_PATH and are non-empty. Call `complete` with filenames and sizes.
