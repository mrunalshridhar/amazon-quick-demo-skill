### Step 22: Append Sample Questions
- **Mode**: `agentic`
- **Tool**: `file_edit`
- **Input**: Validated dataset (actual column names, dimension values)
- **Output**: 3-5 tailored sample questions appended to demo script

1. Read the dataset CSV header and sample rows to understand actual column names and values
2. Read the enrichment file to understand available context
3. Generate 3-5 compelling natural-language questions that:
   - Use actual column names and dimension values from the dataset
   - Demonstrate different question types (trend, comparison, top-N, aggregation)
   - Are phrased naturally
4. Append as a numbered list to `DEMO_ARTIFACT_PATH/demo-script.md`

Format:
```markdown
### Sample Questions:
1. "What was the total [measure] by [dimension] over the last 6 months?"
2. ...
```

**⚠️ DO NOT STOP HERE.** Proceed to Step 22b.
