### Step 27: Verification
- **Mode**: `agentic`
- **Input**: All generated artifacts
- **Output**: Verification report confirming consistency and completeness

Perform a thorough check using `run_python`:

1. **File existence**: Verify ALL expected files exist at `DEMO_ARTIFACT_PATH`:
   - `demo-script.md` and `demo-script.docx`
   - `amazon-quick-features.pptx` and `amazon-quick-features.html`
   - `sample-data-*.csv` and `sample-data-*-enrichment.txt`
   - (If Full Platform): Space documents (PPTX, XLSX, DOCX)

2. **Dataset validation**: Row count ~10K, column count 12, date_offset range, positive measures

3. **Enrichment validation**: Contains `addDateTime`, no hardcoded years

4. **Filename convention**: All lowercase, hyphens, correct format

5. **Demo script checks**:
   - Contains Quick Web workflow reference (if Full Platform)
   - No `index_directory` or `register_file_for_rag` references
   - Contains sample questions with actual column names
   - (If Full Platform): Contains Acts 6-10 with skippable notes

If any issue is found, fix it immediately.

> ✅ Verification complete — all demo data is consistent and complete.

**⚠️ DO NOT STOP HERE.** Proceed to Step 28.
