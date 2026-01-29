#!/usr/bin/env node
/**
 * Get details for a specific VAPI call
 *
 * Usage:
 *   node get-call.js <call-id>
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { getCall } from './vapi-client.js';

async function main() {
  const callId = process.argv[2];

  if (!callId || callId === '--help') {
    console.log(`
Get details for a specific VAPI call

Usage:
  node get-call.js <call-id>

Arguments:
  call-id    The ID of the call to retrieve

Environment:
  VAPI_API_KEY    Required. Your VAPI API key.
`);
    return;
  }

  try {
    const call = await getCall(callId);
    console.log(JSON.stringify(call, null, 2));
  } catch (error) {
    console.error('Failed to get call:', error.message);
    process.exit(1);
  }
}

main();
