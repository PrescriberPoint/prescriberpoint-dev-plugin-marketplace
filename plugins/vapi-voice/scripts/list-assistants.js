#!/usr/bin/env node
/**
 * List VAPI assistants
 *
 * Usage:
 *   node list-assistants.js
 *   node list-assistants.js --limit 10
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { listAssistants } from './vapi-client.js';

async function main() {
  const args = process.argv.slice(2);
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    if (key === 'help') {
      console.log(`
List VAPI assistants

Usage:
  node list-assistants.js [options]

Options:
  --limit <n>    Maximum number of assistants to return

Environment:
  VAPI_API_KEY   Required. Your VAPI API key.
`);
      return;
    }
    params[key] = value;
  }

  try {
    const assistants = await listAssistants(params);
    console.log(JSON.stringify(assistants, null, 2));
  } catch (error) {
    console.error('Failed to list assistants:', error.message);
    process.exit(1);
  }
}

main();
