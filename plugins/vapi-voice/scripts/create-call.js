#!/usr/bin/env node
/**
 * Create an outbound VAPI call
 *
 * Usage:
 *   node create-call.js --config <path-to-config.json>
 *   node create-call.js --phone-number-id <id> --customer <number> --assistant-id <id>
 *   echo '<json>' | node create-call.js --stdin
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { createCall, listPhoneNumbers } from './vapi-client.js';
import { readFileSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);

  let config;

  // Parse arguments
  if (args.includes('--stdin')) {
    // Read config from stdin
    const input = readFileSync(0, 'utf-8');
    config = JSON.parse(input);
  } else if (args.includes('--config')) {
    // Read config from file
    const configIndex = args.indexOf('--config');
    const configPath = args[configIndex + 1];
    if (!configPath) {
      console.error('Error: --config requires a file path');
      process.exit(1);
    }
    const content = readFileSync(configPath, 'utf-8');
    config = JSON.parse(content);
  } else if (args.includes('--phone-number-id') && args.includes('--customer')) {
    // Build config from arguments
    config = {};

    const phoneIndex = args.indexOf('--phone-number-id');
    config.phoneNumberId = args[phoneIndex + 1];

    const customerIndex = args.indexOf('--customer');
    config.customer = { number: args[customerIndex + 1] };

    if (args.includes('--assistant-id')) {
      const assistantIndex = args.indexOf('--assistant-id');
      config.assistantId = args[assistantIndex + 1];
    }

    if (args.includes('--name')) {
      const nameIndex = args.indexOf('--name');
      config.customer.name = args[nameIndex + 1];
    }
  } else if (args.includes('--list-phone-numbers')) {
    // Helper to list available phone numbers
    const phoneNumbers = await listPhoneNumbers();
    console.log('Available Phone Numbers:');
    console.log(JSON.stringify(phoneNumbers, null, 2));
    return;
  } else if (args.includes('--help') || args.length === 0) {
    console.log(`
Create an outbound VAPI call

Usage:
  node create-call.js --config <path-to-config.json>
  node create-call.js --phone-number-id <id> --customer <number> [--assistant-id <id>] [--name <name>]
  echo '<json>' | node create-call.js --stdin
  node create-call.js --list-phone-numbers

Options:
  --config <path>         Path to JSON config file
  --stdin                 Read JSON config from stdin
  --phone-number-id <id>  Your VAPI phone number ID
  --customer <number>     Destination phone number (E.164 format: +1XXXXXXXXXX)
  --assistant-id <id>     ID of saved assistant to use
  --name <name>           Optional name for the customer
  --list-phone-numbers    List available phone numbers

Environment:
  VAPI_API_KEY            Required. Your VAPI API key from https://dashboard.vapi.ai

Example config.json:
  {
    "phoneNumberId": "pn_abc123",
    "customer": { "number": "+18005551234" },
    "assistant": {
      "model": {
        "provider": "openai",
        "model": "gpt-4o",
        "messages": [{ "role": "system", "content": "You are a helpful assistant." }]
      },
      "firstMessage": "Hello, how can I help you today?"
    }
  }
`);
    return;
  } else {
    console.error('Error: Invalid arguments. Use --help for usage.');
    process.exit(1);
  }

  // Validate config
  if (!config.phoneNumberId) {
    console.error('Error: phoneNumberId is required');
    process.exit(1);
  }
  if (!config.customer?.number && !config.customers) {
    console.error('Error: customer.number or customers array is required');
    process.exit(1);
  }
  if (!config.assistantId && !config.assistant) {
    console.error('Error: Either assistantId or assistant configuration is required');
    process.exit(1);
  }

  try {
    console.log('Creating call...');
    const result = await createCall(config);
    console.log('Call created successfully:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed to create call:', error.message);
    process.exit(1);
  }
}

main();
