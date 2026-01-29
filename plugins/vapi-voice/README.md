# VAPI Voice Plugin

VAPI voice AI orchestration for healthcare outbound calls, IVR navigation, and administrative task automation.

## Installation

```
/plugin install vapi-voice@prescriberpoint-plugins
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
