#!/usr/bin/env node
/**
 * List available VAPI voices
 *
 * Usage:
 *   node list-voices.js
 *   node list-voices.js --provider elevenlabs
 *   node list-voices.js --provider playht
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { listVoices } from './vapi-client.js';

async function main() {
  const args = process.argv.slice(2);
  const params = {};

  // Parse arguments
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i]?.replace('--', '');
    const value = args[i + 1];

    if (key === 'help') {
      console.log(`
List available VAPI voices

Usage:
  node list-voices.js [options]

Options:
  --provider <name>   Filter by provider (elevenlabs, playht, deepgram, openai, azure, etc.)
  --limit <n>         Maximum number of voices to return

Environment:
  VAPI_API_KEY        Required. Your VAPI API key.

Common Providers:
  - elevenlabs        High-quality, expressive voices
  - playht            Natural conversational voices
  - openai            OpenAI TTS voices
  - azure             Microsoft Azure voices
  - deepgram          Deepgram Aura voices

Example:
  node list-voices.js --provider elevenlabs
`);
      return;
    }
    if (value) {
      params[key] = value;
    }
  }

  try {
    const voices = await listVoices(params);

    if (Array.isArray(voices)) {
      console.log(`Found ${voices.length} voice(s):\n`);

      // Group by provider for easier reading
      const byProvider = {};
      for (const voice of voices) {
        const provider = voice.provider || 'unknown';
        if (!byProvider[provider]) {
          byProvider[provider] = [];
        }
        byProvider[provider].push(voice);
      }

      for (const [provider, providerVoices] of Object.entries(byProvider)) {
        console.log(`\n=== ${provider.toUpperCase()} ===`);
        for (const voice of providerVoices) {
          console.log(`  ID: ${voice.voiceId || voice.id}`);
          if (voice.name) console.log(`    Name: ${voice.name}`);
          if (voice.description) console.log(`    Description: ${voice.description}`);
          if (voice.gender) console.log(`    Gender: ${voice.gender}`);
          if (voice.accent) console.log(`    Accent: ${voice.accent}`);
          console.log('');
        }
      }
    } else {
      console.log(JSON.stringify(voices, null, 2));
    }
  } catch (error) {
    console.error('Failed to list voices:', error.message);
    process.exit(1);
  }
}

main();
