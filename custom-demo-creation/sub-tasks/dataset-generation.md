# Dataset Generation Sub-Task

You are generating a demo dataset (CSV) and enrichment file (TXT) for an Amazon Quick custom demo.

## Parameters (provided in objective)
- CUSTOMER_NAME, INDUSTRY_NAME
- OUTPUT_PATH (absolute path to save files)
- EXPECTED_CSV_FILENAME, EXPECTED_ENRICHMENT_FILENAME
- DATASET_SCHEMA (8 dimensions with category values, 3 measures with ranges)

## Step 1: Validate Parameters
Confirm all required parameters are present. If any are missing, fail with a clear error.

## Step 2: Generate CSV (~10,000 rows)

Use `run_python_with_write` to generate the dataset:

**Structure:** 12 columns total
- 8 dimension columns (categorical — use exact category values from schema)
- 1 date_offset column (integer, range -730 to 0, uniformly distributed)
- 3 measure columns (numerical, within specified ranges)

**Data quality rules:**
- Exactly 10,000 rows (no more, no less)
- All 3 measures must show a **positive overall trend** (newer dates = higher values on average). Implement using a slope factor on date_offset.
- Distribute dimension values realistically (not perfectly uniform — some categories should be more common)
- No NULL values, no empty strings
- date_offset=0 means today, -730 means 2 years ago

**Technical approach:**
```python
import csv, random, os
# Generate rows with trend: measure = base + (date_offset + 730) * slope + noise
```

Save to `OUTPUT_PATH/EXPECTED_CSV_FILENAME`.

## Step 3: Generate Enrichment TXT

The enrichment file provides context for the AI to understand the dataset. Create a TXT file with:

1. **Dataset description** (2-3 sentences about what this data represents)
2. **Column descriptions** for ALL 12 columns (name, type, description)
3. **Date handling instructions:**
   ```
   The date_offset column represents days relative to today (0 = today, -730 = 2 years ago).
   To convert to actual dates, use: addDateTime(today(), date_offset, 'DD')
   When users ask about "last month", "this quarter", etc., calculate the appropriate date_offset range.
   ```
4. **Analysis guidance** (5-8 suggested investigation areas relevant to the industry)

**CRITICAL: The enrichment file must contain ZERO hard-coded dates.** No calendar years, no month names, no quarter references. Only relative time expressions. Validate with regex `\b20\d{2}\b` — must return zero matches.

Save to `OUTPUT_PATH/EXPECTED_ENRICHMENT_FILENAME`.

## Step 4: Validate

Using `run_python`, verify:
1. CSV exists and has exactly 10,000 rows + header
2. CSV has exactly 12 columns
3. date_offset range is -730 to 0
4. All measures are positive
5. All 3 measures show positive trend (mean of recent 90 days > mean of oldest 90 days)
6. Enrichment file exists
7. Enrichment contains "addDateTime"
8. Enrichment contains ZERO matches for regex `\b20\d{2}\b`
9. Both filenames are all-lowercase with hyphens

## Step 5: Complete
Call `complete` with summary of what was generated.
