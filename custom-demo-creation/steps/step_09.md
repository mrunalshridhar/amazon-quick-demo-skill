### Step 9: Customer Brand Lookup
- **Mode**: `agentic`
- **Tools**: `web_search`, `url_fetch`
- **Input**: Customer name (only for Customer targets)
- **Output**: Confirmed `BRAND_COLOURS` palette
- **Skip if**: Target type is Industry-only

1. Web search: `"<Customer>" brand guidelines colours hex codes design system`
2. If results reference a design system page, fetch it for hex values
3. Identify: primary colour, accent colour, dark colour, text colour
4. Present to user:
   > "I found these brand colours for [Customer]:
   > - Primary: `#XXXXXX`
   > - Accent: `#XXXXXX`
   > - Dark: `#XXXXXX`
   > - Text: `#XXXXXX`
   >
   > Should I use these?"
5. Wait for confirmation
6. Store as `BRAND_COLOURS`

**Fallback** if search yields nothing — use industry-appropriate palette:
- Healthcare: #0B55B7, #02A78B, #00473E, #212B32
- Finance: #1B365D, #C5A258, #0A1628, #333333
- Technology: #0066CC, #6B46C1, #1A1A2E, #2D2D2D
- Government: #003366, #B22234, #002244, #333333

Present fallback and confirm with user.
