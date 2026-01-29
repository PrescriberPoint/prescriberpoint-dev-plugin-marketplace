# UX Designer Plugin

UX design recommendations, audit feedback, and usability analysis for healthcare software.

## Installation

```
/plugin install ux-designer@prescriberpoint-plugins
```

## Usage

```
/ux <request>
```

## Examples

### Design Requests
```
/ux Design a patient onboarding wizard with 3 steps
/ux What's the best way to display medication schedules on mobile?
/ux How should we handle form validation for the prescription form?
```

### Audit/Review Requests
```
/ux Review this login flow for usability issues: [describe or paste code]
/ux What accessibility problems do you see in this component?
/ux Evaluate this dashboard layout against Nielsen's heuristics
```

### Usability Questions
```
/ux Is this touch target size appropriate for mobile?
/ux How should we prioritize information on this settings page?
/ux What's the best error message pattern for failed API calls?
```

## What You Get

### For Design Requests
- Component recommendations with usage guidance
- Step-by-step interaction flows
- Responsive behavior notes (mobile/tablet/desktop)
- Edge case handling (empty, error, loading states)

### For Audits
- Issues rated by severity (1-4 scale)
- Heuristic violations identified
- Accessibility concerns flagged
- Prioritized fix recommendations

### For Usability Questions
- Best practice guidance
- Healthcare-specific considerations
- Concrete implementation suggestions

## Healthcare UX Expertise

- **HIPAA Patterns**: Proper session handling, no PHI in URLs
- **Clinical Workflows**: Efficiency for healthcare professionals
- **Accessibility**: WCAG 2.1 AA compliance guidance
- **Trust Signals**: Credibility and professional appearance

## Severity Ratings

| Rating | Level | Description |
|--------|-------|-------------|
| 1 | Cosmetic | Fix if time permits |
| 2 | Minor | Low priority |
| 3 | Major | High priority, causes frustration |
| 4 | Critical | Must fix before release |
