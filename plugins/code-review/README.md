# Code Review Plugin

A code review skill for PrescriberPoint development standards.

## Installation

```
/plugin install code-review@prescriberpoint-plugins
```

## Usage

```
/review
```

Select code in your editor or make recent changes, then invoke `/review` to get feedback on:

- **Bugs & Edge Cases**: Potential logic errors, null handling, boundary conditions
- **Security Concerns**: HIPAA compliance, PHI handling, injection vulnerabilities
- **Performance Issues**: Inefficient algorithms, unnecessary re-renders, memory leaks
- **Readability**: Code clarity, naming conventions, complexity
- **Standards Compliance**: Adherence to PrescriberPoint coding standards

## Output

The review provides concise, actionable feedback prioritized by severity. Issues are categorized and include specific recommendations for resolution.

## Example

```
/review
```

Output:
```
## Security (High)
- Line 42: User input passed directly to SQL query. Use parameterized queries.

## Bug (Medium)
- Line 67: Missing null check on `patient.records` before iteration.

## Performance (Low)
- Line 89: Consider memoizing this computed value to avoid recalculation on each render.
```
