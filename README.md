# PrescriberPoint Plugin Marketplace

Official Claude Code plugin marketplace for PrescriberPoint staff tools and workflows.

## Installation

Add the marketplace to your Claude Code installation:

```
/plugin marketplace add PrescriberPoint/prescriberpoint-dev-plugin-marketplace
```

## Available Plugins

| Plugin | Skills | Description |
|--------|--------|-------------|
| [code-review](./plugins/code-review/) | `/review` | Code review for PrescriberPoint development standards |
| [test-engineer](./plugins/test-engineer/) | `/test` | Automated E2E test development for Node, Python, and .NET |
| [ux-designer](./plugins/ux-designer/) | `/ux` | UX design recommendations, audits, and usability analysis |
| [seo-analyst](./plugins/seo-analyst/) | `/seo` | SEO keyword research, technical audits, and optimization |
| [vapi-voice](./plugins/vapi-voice/) | `/call`, `/assistant`, `/ivr` | VAPI voice AI for healthcare administrative automation |

## Installing Plugins

After adding the marketplace, install individual plugins:

```
/plugin install code-review@prescriberpoint-plugins
/plugin install test-engineer@prescriberpoint-plugins
/plugin install ux-designer@prescriberpoint-plugins
/plugin install seo-analyst@prescriberpoint-plugins
/plugin install vapi-voice@prescriberpoint-plugins
```

Or install all at once:

```
/plugin install code-review@prescriberpoint-plugins test-engineer@prescriberpoint-plugins ux-designer@prescriberpoint-plugins seo-analyst@prescriberpoint-plugins vapi-voice@prescriberpoint-plugins
```

## Usage

Once installed, invoke skills directly:

```
/review                    # Review selected code
/test Write E2E tests for the login flow
/ux Design a patient onboarding wizard
/seo Find keyword opportunities for medication adherence
/call Configure a pharmacy status check call
```

## Plugin Details

### code-review
Simple code review skill that evaluates code for bugs, security (HIPAA/PHI), performance, and adherence to PrescriberPoint standards.

### test-engineer
**Agent-based plugin** that explores your codebase to understand existing test patterns, then creates comprehensive E2E tests using the appropriate framework (Jest, Playwright, pytest, xUnit, etc.).

### ux-designer
UX expertise for healthcare software including design recommendations, usability audits against Nielsen's heuristics, and accessibility guidance (WCAG 2.1 AA).

### seo-analyst
SEO analysis with Google Search Console integration. Performs keyword research, technical audits, and provides optimization recommendations with healthcare E-E-A-T and YMYL compliance awareness.

### vapi-voice
VAPI voice AI orchestration for healthcare administrative tasks:
- `/call` - Configure outbound calls to pharmacies, insurers, hub services
- `/assistant` - Design voice AI assistants for specific tasks
- `/ivr` - IVR navigation strategies for major healthcare organizations

## Updating

To get the latest plugins:

```
/plugin marketplace update prescriberpoint-plugins
```

## Contributing

To add or modify plugins, see the [Claude Code plugin documentation](https://docs.claude.ai/en/plugins).

### Plugin Structure

```
plugins/
└── your-plugin/
    ├── .claude-plugin/
    │   └── plugin.json      # Plugin manifest
    ├── README.md            # Plugin documentation
    ├── skills/
    │   └── skill-name/
    │       └── SKILL.md     # Skill definition
    └── agents/              # Optional, for agent-based plugins
        └── agent-name.md
```

After adding a plugin, update `.claude-plugin/marketplace.json` to include it.
