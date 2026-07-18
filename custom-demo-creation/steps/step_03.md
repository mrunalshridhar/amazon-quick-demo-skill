### Step 3: Ask Demo Target Type
- **Mode**: `agentic`
- **Input**: Confirmed prerequisites
- **Output**: User's choice of "Customer" or "Industry"

Present this decision card:
```
<decision question="Would you like this demo built for a specific customer or for an industry?">
<option description="Tailor the demo for a specific company">Customer</option>
<option description="Tailor the demo for an industry vertical">Industry</option>
</decision>
```

Wait for the user's response before proceeding.
