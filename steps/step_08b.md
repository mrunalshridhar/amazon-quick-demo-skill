### Step 8b: Ask Integration Showcase Preferences
- **Mode**: `agentic` (user interaction — multi-select decision card)
- **Input**: None (comes after Step 8 use case notes)
- **Output**: `INTEGRATION_SHOWCASE` list (e.g., ["outlook", "calendar", "slack"] or ["none"])

Present this decision card:

```
<decision question="Which integrations would you like to showcase live during the demo? Select any that are connected and you're comfortable using live." multi="true">
<option description="Draft an email referencing the storyline (will NOT auto-send — stays as draft)">Outlook / Email</option>
<option description="Create a meeting invite with storyline characters">Calendar</option>
<option description="Post a status update to a channel you specify">Slack</option>
<option description="Post a message in a Teams channel you specify">Teams</option>
<option description="Skip — I'll describe integrations verbally without live actions">None (describe only)</option>
</decision>
```

Store the selection as `INTEGRATION_SHOWCASE`.

**Selection logic:**
- If "None (describe only)" is selected alone → `INTEGRATION_SHOWCASE = ["none"]`
- If "None" is selected alongside other options → ignore "None", use the other selections
- If multiple integrations selected → include all of them in Act 5b

**⚠️ DO NOT STOP HERE.** Proceed to Step 1c (Initialize Demo Manifest).
