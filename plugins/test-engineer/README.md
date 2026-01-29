# Test Engineer Plugin

Automated E2E test development for Node, Python, and .NET with browser automation expertise.

## Installation

```
/plugin install test-engineer@prescriberpoint-plugins
```

## Usage

```
/test <description of what to test>
```

## Capabilities

### Languages & Frameworks

| Stack | Unit/Integration | E2E/Browser | API | BDD |
|-------|------------------|-------------|-----|-----|
| **Node.js** | Jest, Mocha, Vitest | Playwright, Puppeteer, Cypress | Supertest | Cucumber |
| **Python** | pytest | pytest-playwright, Selenium | requests/httpx | pytest-bdd, behave |
| **.NET** | xUnit, NUnit, MSTest | Playwright .NET, Selenium | RestSharp | SpecFlow |

### Browser Automation

- **Playwright** (preferred): Cross-browser, auto-waiting, network interception, trace viewer
- **Puppeteer**: Chrome/Chromium automation, PDF generation, screenshots
- **Selenium**: Legacy support, grid infrastructure
- **Cypress**: Component testing, time-travel debugging

## Examples

### Create tests from acceptance criteria
```
/test Create E2E tests for these acceptance criteria:
- User can log in with valid credentials
- User sees error message with invalid password
- User is redirected to dashboard after login
```

### Add regression tests for a bug
```
/test Write a regression test for bug #142 where checkout failed when cart had 100+ items
```

### Generate test coverage for a feature
```
/test Add Playwright tests for the patient search workflow
```

### Test an API endpoint
```
/test Create integration tests for the POST /api/appointments endpoint
```

## Output

The agent produces:

1. **Test files** with complete, runnable code
2. **Page objects** or helpers for maintainability
3. **Setup instructions** if new dependencies are needed
4. **Documentation** explaining what each test verifies

## Test Philosophy

- Tests map directly to acceptance criteria
- Page Object Model for browser tests
- Stable selectors (`data-testid` > roles > text > CSS)
- No hard-coded waits; use proper async patterns
- Tests are independent and can run in parallel
