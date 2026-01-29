#!/usr/bin/env node
/**
 * Create a VAPI assistant
 *
 * Usage:
 *   node create-assistant.js --config <path-to-config.json>
 *   echo '<json>' | node create-assistant.js --stdin
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { createAssistant } from './vapi-client.js';
import { readFileSync } from 'fs';

async function main() {
  const args = process.argv.slice(2);

  let config;

  if (args.includes('--stdin')) {
    const input = readFileSync(0, 'utf-8');
    config = JSON.parse(input);
  } else if (args.includes('--config')) {
    const configIndex = args.indexOf('--config');
    const configPath = args[configIndex + 1];
    if (!configPath) {
      console.error('Error: --config requires a file path');
      process.exit(1);
    }
    const content = readFileSync(configPath, 'utf-8');
    config = JSON.parse(content);
  } else if (args.includes('--help') || args.length === 0) {
    console.log(`
Create a VAPI assistant

Usage:
  node create-assistant.js --config <path-to-config.json>
  echo '<json>' | node create-assistant.js --stdin

Options:
  --config <path>   Path to JSON config file
  --stdin           Read JSON config from stdin

Environment:
  VAPI_API_KEY      Required. Your VAPI API key.

Example config.json:
  {
    "name": "PharmacyStatusChecker",
    "model": {
      "provider": "openai",
      "model": "gpt-4o",
      "messages": [{
        "role": "system",
        "content": "You are a healthcare assistant calling pharmacies..."
      }]
    },
    "voice": {
      "provider": "elevenlabs",
      "voiceId": "21m00Tcm4TlvDq8ikWAM"
    },
    "firstMessage": "Hello, I'm calling from the doctor's office."
  }
`);
    return;
  } else {
    console.error('Error: Invalid arguments. Use --help for usage.');
    process.exit(1);
  }

  try {
    console.log('Creating assistant...');
    const result = await createAssistant(config);
    console.log('Assistant created successfully:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Failed to create assistant:', error.message);
    process.exit(1);
  }
}

main();
