### Step 21: Dataset Validation
- **Mode**: `deterministic`
- **Input**: Dataset CSV at `DEMO_ARTIFACT_PATH`
- **Output**: Confirmation that dataset meets quality requirements

Validate using `run_python`:
1. File exists at `DEMO_ARTIFACT_PATH/[EXPECTED_CSV_FILENAME]`
2. Has approximately 10,000 rows (±500)
3. Has exactly 12 columns (8 dimensions + date_offset + 3 measures)
4. The `date_offset` column ranges approximately from -730 to 0
5. All three measure columns show positive values

Also validate the enrichment file:
1. File exists with correct filename
2. Contains `addDateTime` formula reference
3. Contains `date_offset` handling instructions
4. Contains ZERO hard-coded years (no `20XX` patterns)

If validation fails, report the issue and attempt to fix inline.

**⚠️ DO NOT STOP HERE.** Proceed to Step 22.
