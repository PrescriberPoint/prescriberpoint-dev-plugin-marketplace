# VAPI Voice Plugin

VAPI voice AI orchestration for healthcare outbound calls, IVR navigation, and administrative task automation.

## Installation

```
/plugin install vapi-voice@prescriberpoint-plugins
```

## Prerequisites

### VAPI API Key (Required)

This plugin requires a VAPI API key to interact with the VAPI service. Set it as an environment variable:

```bash
export VAPI_API_KEY="your-api-key-here"
```

Get your API key from: https://dashboard.vapi.ai

**For persistent configuration**, add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
echo 'export VAPI_API_KEY="your-api-key-here"' >> ~/.zshrc
```

### Node.js

The scripts require Node.js 18+ (for native fetch support).

## Scripts

The plugin includes command-line scripts for direct VAPI interaction:

```
plugins/vapi-voice/scripts/
├── vapi-client.js        # Shared API client module
├── create-call.js        # Create outbound calls
├── list-calls.js         # List call history
├── get-call.js           # Get call details
├── get-transcript.js     # Get call transcript
├── get-analysis.js       # Get call analysis & structured outputs
├── get-cost.js           # Get call cost breakdown
├── create-assistant.js   # Create saved assistants
├── list-assistants.js    # List assistants
├── list-voices.js        # List available voices
└── list-phone-numbers.js # List available phone numbers
```

### Usage Examples

```bash
# List your phone numbers
node scripts/list-phone-numbers.js

# List available voices
node scripts/list-voices.js
node scripts/list-voices.js --provider elevenlabs

# List existing assistants
node scripts/list-assistants.js

# Create a call from config file
node scripts/create-call.js --config call-config.json

# Create a call from stdin
echo '{"phoneNumberId":"...","customer":{"number":"+1..."},"assistantId":"..."}' | node scripts/create-call.js --stdin

# Get call details
node scripts/get-call.js <call-id>

# List recent calls
node scripts/list-calls.js --limit 10

# Get call transcript (after call ends)
node scripts/get-transcript.js <call-id>

# Get call analysis and structured outputs
node scripts/get-analysis.js <call-id>

# Get call cost breakdown
node scripts/get-cost.js <call-id>
```

## Skills

| Skill | Command | Purpose |
|-------|---------|---------|
| Call Configuration | `/call` | Create outbound call configurations |
| Assistant Design | `/assistant` | Design voice AI assistants for specific tasks |
| IVR Navigation | `/ivr` | IVR navigation strategies and patterns |

## Use Cases

### Pharmacy Calls
- Prescription status checks
- Refill requests and coordination
- Transfer requests between pharmacies
- Prior authorization status follow-ups

### Insurance / PBM Calls
- Benefits verification
- Prior authorization status
- Claims status inquiries
- Appeals and peer-to-peer scheduling

### Hub Services / Specialty Pharmacy
- Patient enrollment status
- Shipment tracking
- Reauthorization coordination
- Patient assistance program inquiries

## Examples

### Configure a Pharmacy Status Call
```
/call Create a call to check prescription status at CVS for RX#7654321,
patient John Doe DOB 01/15/1980, calling from Dr. Smith's office NPI 1234567890
```

### Design a Benefits Verification Assistant
```
/assistant Design an assistant for verifying insurance benefits with major payers.
Needs to gather: eligibility, copays, deductible status, prior auth requirements
```

### Get IVR Navigation Help
```
/ivr What's the fastest path to reach a representative at UnitedHealthcare
for prior authorization status?
```

## Key Features

### IVR Navigation
- Pre-mapped patterns for major pharmacies, payers, and PBMs
- DTMF tone support for keypad navigation
- Voice command strategies for voice-enabled IVRs
- Failure recovery and retry logic

### Hold Time Management
- Configurable maximum hold duration
- Silence detection settings
- Callback option handling
- Hold behavior instructions

### Human Transfer
- Configurable transfer triggers
- Warm handoff with context summary
- Multiple transfer destinations
- Escalation criteria

### Disposition Tracking
- Structured outcome recording
- Reference number capture
- Action item documentation
- Webhook integration for results

## Healthcare Compliance

### HIPAA Considerations
- Minimum necessary information sharing
- Identity verification before PHI disclosure
- Call documentation requirements
- Voicemail handling guidelines

### Call Recording
- Consent documentation
- TCPA compliance for automated calls
- State-specific regulations

## VAPI API Quick Reference

### Create Call Endpoint
```
POST https://api.vapi.ai/call
Authorization: Bearer <VAPI_API_KEY>
```

### Basic Call Structure
```json
{
  "assistant": { ... },
  "phoneNumberId": "your-phone-id",
  "customer": {
    "number": "+1XXXXXXXXXX"
  }
}
```

### Key Configuration Options
| Parameter | Description |
|-----------|-------------|
| `assistant` | Transient assistant configuration |
| `assistantId` | Reference to saved assistant |
| `phoneNumberId` | Your VAPI phone number ID |
| `customer.number` | Destination phone number |
| `schedulePlan` | Schedule call for future time |
| `maxDurationSeconds` | Maximum call length |

## Webhook Events

Configure `serverUrl` in assistant to receive:
- `end-of-call-report` - Call completion summary
- `status-update` - Real-time call status
- `transfer-destination-request` - Dynamic transfer routing
- `tool-calls` - Custom function invocations

## Resources

- [VAPI Documentation](https://docs.vapi.ai)
- [Outbound Calling Guide](https://docs.vapi.ai/calls/outbound-calling)
- [Create Call API](https://docs.vapi.ai/api-reference/calls/create)
- [Assistant Configuration](https://docs.vapi.ai/assistants/quickstart)
