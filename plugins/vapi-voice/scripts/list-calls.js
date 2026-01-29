#!/usr/bin/env node
/**
 * List VAPI calls
 *
 * Usage:
 *   node list-calls.js
 *   node list-calls.js --limit 10
 *   node list-calls.js --status ended
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { listCalls } from './vapi-client.js';

async function main() {
  const args = process.argv.slice(2);
  const params = {};

  // Parse arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    const value = args[i + 1];
    if (key === 'help') {
      console.log(`
List VAPI calls

Usage:
  node list-calls.js [options]

Options:
  --limit <n>       Maximum number of calls to return
  --status <status> Filter by status (queued, ringing, in-progress, ended)
  --assistantId <id> Filter by assistant ID

Environment:
  VAPI_API_KEY      Required. Your VAPI API key.
`);
      return;
    }
    params[key] = value;
  }

  try {
    const calls = await listCalls(params);
    console.log(JSON.stringify(calls, null, 2));
  } catch (error) {
    console.error('Failed to list calls:', error.message);
    process.exit(1);
  }
}

main();
