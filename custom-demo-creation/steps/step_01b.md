### Step 1b: Resolve Demo Readme Artifact Folder Path
- **Mode**: `deterministic`
- **Input**: The session/conversation ID returned by `search_conversations` in Step 1
- **Output**: An absolute filesystem path stored as `DEMO_ARTIFACT_PATH`
- **Validate**: Path is well formed and folder exists or can be created
- **On failure**: Output error and STOP

Construct the absolute path:
```
~/.quickwork/profiles/<profile_id>/sessions/<demo_readme_session_id>/workspace/artifacts/
```

Store as `DEMO_ARTIFACT_PATH`. All subsequent file saves use this path.

Verify the path exists with `folder_list`. If not, create with `folder_create`.
