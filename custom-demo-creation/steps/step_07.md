### Step 7: Ask Demo Scope
- **Mode**: `agentic`
- **Input**: Confirmed target from Step 6
- **Output**: User's choice stored as `DEMO_SCOPE`

Present this decision card:
```
<decision question="What scope should this demo cover?">
<option description="Quick Desktop only — Acts 1-5 (Email, Meeting Prep, Slack, KG, Dataset Q&A)">Desktop only</option>
<option description="Full Platform — Desktop (Acts 1-5) + Quick Web (Spaces, Chat Agents, Flows, Research, Generate Analysis, Apps)">Full Platform (Desktop + Web)</option>
</decision>
```

Store result as `DEMO_SCOPE` ("desktop" or "full_platform").
Wait for the user's response.
