### Step 28: Final Summary & Backup Offer
- **Mode**: `agentic` (includes user interaction)
- **Input**: All completed steps
- **Output**: Summary + instructions + backup offer

**⚠️ COMPLETION GATE — Verify ALL artifacts exist before generating summary.**

Print the final summary:

> ✅ **Demo Environment Ready**
>
> **Artifacts created:**
> - amazon-quick-features.pptx — Features presentation (8 slides, Desktop + Web)
> - amazon-quick-features.html — Interactive HTML features explorer
> - demo-script.md — Full demo walkthrough
> - demo-script.docx — Same in Word format
> - sample-data-*.csv — Sample dataset (~10K rows)
> - sample-data-*-enrichment.txt — Dataset enrichment metadata
> [If Full Platform:]
> - [strategy].pptx — Strategy deck for Space
> - [tracker].xlsx — Project tracker for Space
> - [brief].docx — Project brief for Space
>
> **Activity Feed:** [X] items populated
> **Knowledge Graph:** [X] entities, [X] relationships

Then print these instructions (VERBATIM):

> ⚠️ **IMPORTANT — Next Steps:**
>
> 1. **Go to the Demo Readme conversation** and ask: "Show me all available files" — this gives you a complete index of everything that was generated.
>
> 2. **Take a QuickSwitch snapshot NOW** — Go to QuickSwitch and save the current demo state. This is critical because demo steps (drafting emails, generating prep notes) change the data state and cannot be undone without a snapshot.
>
> 3. **Review the content** — Open the demo script and features deck to verify the storyline works for your audience.
>
> 4. **Request modifications here** — If anything needs changing, ask in THIS conversation.
>
> 5. **[If Full Platform] Upload Space documents** — Follow the prep steps in the demo script to set up the Space on Quick Web.

Then offer backup:

```
<decision question="Would you like me to create a portable backup of this demo? You can restore it later without relying on QuickSwitch.">
<option description="Create a backup I can store on my machine">Yes, create backup</option>
<option description="QuickSwitch snapshot is enough for me">No thanks</option>
</decision>
```

If user selects "No thanks" — the workflow is COMPLETE. Stop here.
If user selects "Yes" — proceed to Step 29.
