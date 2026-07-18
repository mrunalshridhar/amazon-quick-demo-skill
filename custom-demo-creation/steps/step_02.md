### Step 2: Verify Demo Placeholder Files
- **Mode**: `deterministic`
- **Tool**: `query_conversations`
- **Input**: Query Demo Readme conversation for file references
- **Output**: Confirmation that placeholder files are referenced
- **Validate**: At least one message references all four files: "demo-script.md", "demo-script.docx", "amazon-quick-features.pptx", "amazon-quick-features.html"
- **On failure**: Output the following and STOP:
  > "Placeholder demo content files were not found. Seems like you are not running this skill from the correct local demo build environment. Please use QuickSwitch to launch local demo build state and try again."

Use `query_conversations` to search within the Demo Readme conversation. Any mention of the filename counts as valid. Do NOT use `file_read` — files don't exist on disk yet.
