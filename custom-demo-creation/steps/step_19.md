### Step 19: Append Dataset Q&A Setup Instructions
- **Mode**: `deterministic`
- **Tool**: `file_edit`
- **Input**: Demo script path + derived filenames from Step 12
- **Output**: Verbatim dataset setup instructions appended

**⚠️ The following block MUST be appended EXACTLY as written — substitute only the filename/space variables.**

Append to `DEMO_ARTIFACT_PATH/demo-script.md`:

```markdown
> **Note:** This section is optional. It requires setup steps below before it can be demonstrated.

### Prep Steps (complete before demo):

> ⚠️ These steps use **Amazon Quick Web** (not Desktop). The dataset is uploaded and queried through Quick Web's Space and dataset features.

1. Click on **My Stuff** and download these two files to your local machine:
   - `${EXPECTED_CSV_FILENAME}` (the sample dataset)
   - `${EXPECTED_ENRICHMENT_FILENAME}` (the enrichment metadata)
2. Open **Amazon Quick Web** in your browser and login to **quicksight-sales-demo** account.
3. Create a dataset (upload file option) using the `${EXPECTED_CSV_FILENAME}` file.
4. In the edit dataset view, select output tab and upload `${EXPECTED_ENRICHMENT_FILENAME}` under custom instructions.
5. Navigate to **Spaces** → **Create Space** → name it `${SPACE_NAME}`
6. In the Space, click **Add Knowledge** → **Datasets** → Choose the dataset created above.
7. The Space is now ready and can be used from Quick desktop to ask data questions

### How to demo Dataset Q&A:

1. In Quick desktop, start a **new conversation**
2. Click the **"+" button** to include the `${SPACE_NAME}` Space in the conversation
3. With the Space active in the conversation, ask natural language questions about the data (see sample questions below)
4. Quick will query the dataset and return answers with accurate date calculations (thanks to the enrichment file)
```

Where `${EXPECTED_CSV_FILENAME}`, `${EXPECTED_ENRICHMENT_FILENAME}`, and `${SPACE_NAME}` are the values derived in Step 12.

**⚠️ DO NOT STOP HERE.** Proceed to Step 20.
