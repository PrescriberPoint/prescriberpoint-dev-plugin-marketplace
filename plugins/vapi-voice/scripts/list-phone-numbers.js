#!/usr/bin/env node
/**
 * List available VAPI phone numbers
 *
 * Usage:
 *   node list-phone-numbers.js
 *   node list-phone-numbers.js --json
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { listPhoneNumbers } from './vapi-client.js';

async function main() {
  const args = process.argv.slice(2);
  const jsonOutput = args.includes('--json');

  if (args.includes('--help')) {
    console.log(`
List available VAPI phone numbers

Usage:
  node list-phone-numbers.js [options]

Options:
  --json    Output raw JSON instead of formatted list

Environment:
  VAPI_API_KEY    Required. Your VAPI API key.
`);
    return;
  }

  try {
    const phoneNumbers = await listPhoneNumbers();

    if (jsonOutput) {
      console.log(JSON.stringify(phoneNumbers, null, 2));
      return;
    }

    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      console.log('No phone numbers found.');
      console.log('');
      console.log('To add a phone number:');
      console.log('  1. Go to https://dashboard.vapi.ai');
      console.log('  2. Navigate to Phone Numbers');
      console.log('  3. Import from Twilio, Vonage, or Telnyx, or use a VAPI number');
      return;
    }

    console.log(`Found ${phoneNumbers.length} phone number(s):\n`);

    for (const phone of phoneNumbers) {
      console.log(`  ID: ${phone.id}`);
      console.log(`    Number: ${phone.number || phone.sipUri || 'N/A'}`);
      if (phone.name) console.log(`    Name: ${phone.name}`);
      if (phone.provider) console.log(`    Provider: ${phone.provider}`);
      if (phone.assistantId) console.log(`    Default Assistant: ${phone.assistantId}`);
      console.log('');
    }

    console.log('Use the ID value as phoneNumberId when creating calls.');
  } catch (error) {
    console.error('Failed to list phone numbers:', error.message);
    process.exit(1);
  }
}

main();
