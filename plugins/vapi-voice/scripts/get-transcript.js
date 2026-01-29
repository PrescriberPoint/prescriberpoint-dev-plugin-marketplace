#!/usr/bin/env node
/**
 * Get call transcript from VAPI
 *
 * Usage:
 *   node get-transcript.js <call-id>
 *   node get-transcript.js <call-id> --json
 *   node get-transcript.js <call-id> --format dialogue
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { getCall } from './vapi-client.js';

function formatDialogue(messages) {
  if (!messages || !Array.isArray(messages)) {
    return 'No messages found.';
  }

  return messages
    .filter(m => m.role === 'user' || m.role === 'assistant' || m.role === 'bot')
    .map(m => {
      const role = m.role === 'user' ? 'Human' : 'AI';
      const content = m.content || m.message || '[no content]';
      return `${role}: ${content}`;
    })
    .join('\n\n');
}

function formatTimestamped(messages) {
  if (!messages || !Array.isArray(messages)) {
    return 'No messages found.';
  }

  return messages
    .filter(m => m.role === 'user' || m.role === 'assistant' || m.role === 'bot')
    .map(m => {
      const role = m.role === 'user' ? 'Human' : 'AI';
      const content = m.content || m.message || '[no content]';
      const time = m.time ? `[${m.time}s]` : '';
      return `${time} ${role}: ${content}`;
    })
    .join('\n\n');
}

async function main() {
  const args = process.argv.slice(2);
  const callId = args.find(a => !a.startsWith('--'));
  const jsonOutput = args.includes('--json');
  const format = args.includes('--format')
    ? args[args.indexOf('--format') + 1]
    : 'dialogue';

  if (!callId || args.includes('--help')) {
    console.log(`
Get call transcript from VAPI

Usage:
  node get-transcript.js <call-id> [options]

Arguments:
  call-id              The ID of the call

Options:
  --json               Output raw JSON
  --format <type>      Output format: dialogue (default), timestamped, raw

Environment:
  VAPI_API_KEY         Required. Your VAPI API key.

Examples:
  node get-transcript.js abc123
  node get-transcript.js abc123 --format timestamped
  node get-transcript.js abc123 --json
`);
    return;
  }

  try {
    const call = await getCall(callId);

    if (jsonOutput) {
      console.log(JSON.stringify({
        id: call.id,
        status: call.status,
        transcript: call.artifact?.transcript,
        messages: call.messages
      }, null, 2));
      return;
    }

    console.log(`Call ID: ${call.id}`);
    console.log(`Status: ${call.status}`);
    console.log(`Duration: ${call.endedAt && call.startedAt
      ? Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000) + 's'
      : 'N/A'}`);
    console.log('');
    console.log('=== TRANSCRIPT ===');
    console.log('');

    // Try artifact transcript first, fall back to messages
    if (call.artifact?.transcript) {
      console.log(call.artifact.transcript);
    } else if (call.messages) {
      if (format === 'timestamped') {
        console.log(formatTimestamped(call.messages));
      } else if (format === 'raw') {
        console.log(JSON.stringify(call.messages, null, 2));
      } else {
        console.log(formatDialogue(call.messages));
      }
    } else {
      console.log('No transcript available.');
    }
  } catch (error) {
    console.error('Failed to get transcript:', error.message);
    process.exit(1);
  }
}

main();
