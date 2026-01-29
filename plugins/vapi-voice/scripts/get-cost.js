#!/usr/bin/env node
/**
 * Get call cost breakdown from VAPI
 *
 * Usage:
 *   node get-cost.js <call-id>
 *   node get-cost.js <call-id> --json
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { getCall } from './vapi-client.js';

function formatCurrency(amount) {
  if (amount === undefined || amount === null) return 'N/A';
  return `$${amount.toFixed(4)}`;
}

async function main() {
  const args = process.argv.slice(2);
  const callId = args.find(a => !a.startsWith('--'));
  const jsonOutput = args.includes('--json');

  if (!callId || args.includes('--help')) {
    console.log(`
Get call cost breakdown from VAPI

Usage:
  node get-cost.js <call-id> [options]

Arguments:
  call-id              The ID of the call

Options:
  --json               Output raw JSON

Environment:
  VAPI_API_KEY         Required. Your VAPI API key.

Cost breakdown includes:
  - Transport (telephony)
  - STT (speech-to-text/transcription)
  - LLM (language model inference)
  - TTS (text-to-speech/voice)
  - VAPI platform fee
  - Analysis costs

Examples:
  node get-cost.js abc123
  node get-cost.js abc123 --json
`);
    return;
  }

  try {
    const call = await getCall(callId);

    if (jsonOutput) {
      console.log(JSON.stringify({
        id: call.id,
        status: call.status,
        costBreakdown: call.costBreakdown,
        costs: call.costs
      }, null, 2));
      return;
    }

    console.log(`Call ID: ${call.id}`);
    console.log(`Status: ${call.status}`);

    // Calculate duration
    if (call.startedAt && call.endedAt) {
      const durationSec = Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000);
      const minutes = Math.floor(durationSec / 60);
      const seconds = durationSec % 60;
      console.log(`Duration: ${minutes}m ${seconds}s`);
    }
    console.log('');

    if (call.costBreakdown) {
      console.log('=== COST BREAKDOWN ===');
      console.log('');

      const cb = call.costBreakdown;

      console.log('Service Costs:');
      console.log(`  Transport (Telephony):  ${formatCurrency(cb.transport)}`);
      console.log(`  STT (Transcription):    ${formatCurrency(cb.stt)}`);
      console.log(`  LLM (Language Model):   ${formatCurrency(cb.llm)}`);
      console.log(`  TTS (Voice):            ${formatCurrency(cb.tts)}`);
      console.log(`  VAPI Platform:          ${formatCurrency(cb.vapi)}`);

      if (cb.analysisCostBreakdown) {
        console.log('');
        console.log('Analysis Costs:');
        console.log(`  Summary:                ${formatCurrency(cb.analysisCostBreakdown.summary)}`);
        console.log(`  Structured Data:        ${formatCurrency(cb.analysisCostBreakdown.structuredData)}`);
        console.log(`  Success Evaluation:     ${formatCurrency(cb.analysisCostBreakdown.successEvaluation)}`);
      }

      // Calculate total
      const total = (cb.transport || 0) + (cb.stt || 0) + (cb.llm || 0) +
                    (cb.tts || 0) + (cb.vapi || 0);
      console.log('');
      console.log(`  TOTAL:                  ${formatCurrency(total)}`);

      // Token usage
      if (cb.llmPromptTokens || cb.llmCompletionTokens) {
        console.log('');
        console.log('Token Usage:');
        console.log(`  Prompt Tokens:          ${cb.llmPromptTokens || 0}`);
        console.log(`  Completion Tokens:      ${cb.llmCompletionTokens || 0}`);
        if (cb.llmCachedPromptTokens) {
          console.log(`  Cached Prompt Tokens:   ${cb.llmCachedPromptTokens}`);
        }
      }

      // TTS characters
      if (cb.ttsCharacters) {
        console.log('');
        console.log('TTS Usage:');
        console.log(`  Characters:             ${cb.ttsCharacters}`);
      }

    } else if (call.costs && Array.isArray(call.costs)) {
      console.log('=== COSTS ===');
      console.log('');

      let total = 0;
      for (const cost of call.costs) {
        console.log(`${cost.type || 'Unknown'}: ${formatCurrency(cost.cost)}`);
        if (cost.cost) total += cost.cost;
      }
      console.log('');
      console.log(`TOTAL: ${formatCurrency(total)}`);
    } else {
      console.log('No cost data available yet.');
      console.log('Cost data is calculated after the call ends.');
    }

  } catch (error) {
    console.error('Failed to get cost:', error.message);
    process.exit(1);
  }
}

main();
