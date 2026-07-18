### Step 22b: Generate Integration Showcase (Act 5b)
- **Mode**: `agentic`
- **Tool**: `file_edit`
- **Input**: `INTEGRATION_SHOWCASE` (from Step 8b), storyline characters/projects, `BRAND_COLOURS`
- **Output**: "Act 5b: Integration Showcase" section appended to demo-script.md
- **Validate**: Section appears after Act 5 and before any Quick Web section

Append to `DEMO_ARTIFACT_PATH/demo-script.md` after the Act 5 (Dataset Q&A) section.

## If INTEGRATION_SHOWCASE contains actual integrations (not "none"):

Generate this structure, including ONLY the subsections for selected integrations:

```markdown
## Act 5b: Integration Showcase (Live Actions)

> **Transition:** Now let's see Quick take action — not just reading and analysing, but actually doing things in your connected tools.
```

### For "Outlook / Email":
```markdown
### Email — Draft a Reply
**Setup:** Ensure Outlook is connected (Settings → Capabilities → Connections)
**Prompt:** "Draft a reply to [storyline external stakeholder name] explaining that [relevant project update — reference specific project milestone from storyline]"
**What happens:** Quick composes an email draft in Outlook. It will NOT auto-send — the draft appears for review.
**Talking Points:**
- Cross-channel awareness — Quick knows about the original email context, the project status from KG, and recent discussions
- Tone and formality matching — adapts to the relationship (external stakeholder = more formal)
- The draft references real context from across the user's workspace — not a generic template
- Privacy: the email is drafted locally, nothing leaves the machine until you hit send
```

### For "Calendar":
```markdown
### Calendar — Create a Meeting
**Setup:** Ensure Calendar is connected (Settings → Capabilities → Connections)
**Prompt:** "Schedule a 30-minute project sync with [storyline team member name] for early next week to discuss [specific project milestone from storyline]"
**What happens:** Quick creates a real calendar event with the specified attendee and agenda.
**Talking Points:**
- Intelligent scheduling — Quick understands who's involved from KG relationships
- No context-switching — stays in the same conversation, no need to open a calendar app
- Can handle complex scheduling: "find a time when both X and Y are free"
**⚠️ Presenter note:** Delete this event after the demo to keep your calendar clean.
```

### For "Slack":
```markdown
### Slack — Post a Status Update
**Setup:** Ensure Slack is connected (Settings → Capabilities → Connections). Choose a test channel beforehand.
**Prompt:** "Post a status update to #[channel-name] summarising the key takeaways from [storyline meeting or project context]"
**What happens:** Quick composes and posts a message to the specified Slack channel.
**Talking Points:**
- Automated status updates — no more manually writing and posting
- Quick synthesises from KG, recent conversations, and project context
- Can adapt format to channel norms (bullet points for updates, prose for announcements)
**⚠️ Presenter note:** Use a test/demo channel. You can delete the message after.
```

### For "Teams":
```markdown
### Teams — Post a Message
**Setup:** Ensure Teams is connected (Settings → Capabilities → Connections). Choose a test channel beforehand.
**Prompt:** "Send a message to [team/channel] with a summary of [storyline context — reference specific project or meeting]"
**What happens:** Quick posts a message to the specified Teams channel.
**Talking Points:**
- Same intelligence as Slack — adapts to the platform
- Enterprise-ready: works within your org's Teams environment
- Can include formatted content, mentions, and action items
**⚠️ Presenter note:** Use a test/demo channel. Delete the message after.
```

## If INTEGRATION_SHOWCASE is ["none"] or empty:

Append a describe-only section:

```markdown
## Act 5b: Integration Capabilities (Overview)

> *This is a describe-only section — no live actions. To demo live, connect integrations in Settings → Capabilities → Connections.*

**Talking Points:**
- Amazon Quick connects to Outlook, Gmail, Slack, Teams, Google Calendar, Jira, Salesforce, and more
- Desktop integrations allow reading AND acting — draft emails, create events, post messages
- Quick Web Chat Agents can have "Action Connectors" for taking actions in external systems
- Flows can chain actions: Research → Draft → Send → Track
- All actions respect existing permissions — Quick can only do what the user's OAuth scope allows
- Privacy: all processing happens locally; only the final action hits the external service
```

## Rules:
- ALL prompts must reference actual storyline characters, projects, and scenarios (not generic placeholders)
- Email ALWAYS defaults to DRAFT mode (never auto-send in a demo)
- Calendar/Slack/Teams include ⚠️ cleanup notes for the presenter
- No hardcoded dates in any prompt
- The act sits AFTER Act 5 (Dataset Q&A) and BEFORE the Quick Web section (if any)

**⚠️ DO NOT STOP HERE.** Proceed to Step 23 (or Step 24 if Desktop-only).
