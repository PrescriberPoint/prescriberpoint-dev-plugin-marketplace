#!/usr/bin/env node
/**
 * Get call analysis and structured outputs from VAPI
 *
 * Usage:
 *   node get-analysis.js <call-id>
 *   node get-analysis.js <call-id> --json
 *
 * Environment:
 *   VAPI_API_KEY - Required. Your VAPI API key.
 */

import { getCall } from './vapi-client.js';

async function main() {
  const args = process.argv.slice(2);
  const callId = args.find(a => !a.startsWith('--'));
  const jsonOutput = args.includes('--json');

  if (!callId || args.includes('--help')) {
    console.log(`
Get call analysis and structured outputs from VAPI

Usage:
  node get-analysis.js <call-id> [options]

Arguments:
  call-id              The ID of the call

Options:
  --json               Output raw JSON

Environment:
  VAPI_API_KEY         Required. Your VAPI API key.

Output includes:
  - Summary: AI-generated call summary
  - Success Evaluation: Whether call objectives were met
  - Structured Data: Extracted data based on schema
  - Structured Outputs: Additional artifact outputs

Examples:
  node get-analysis.js abc123
  node get-analysis.js abc123 --json
`);
    return;
  }

  try {
    const call = await getCall(callId);

    if (jsonOutput) {
      console.log(JSON.stringify({
        id: call.id,
        status: call.status,
        endedReason: call.endedReason,
        analysis: call.analysis,
        artifact: {
          structuredOutputs: call.artifact?.structuredOutputs
        }
      }, null, 2));
      return;
    }

    console.log(`Call ID: ${call.id}`);
    console.log(`Status: ${call.status}`);
    console.log(`Ended Reason: ${call.endedReason || 'N/A'}`);
    console.log('');

    // Analysis section
    if (call.analysis) {
      console.log('=== ANALYSIS ===');
      console.log('');

      if (call.analysis.summary) {
        console.log('SUMMARY:');
        console.log(call.analysis.summary);
        console.log('');
      }

      if (call.analysis.successEvaluation !== undefined) {
        console.log('SUCCESS EVALUATION:');
        console.log(call.analysis.successEvaluation);
        console.log('');
      }

      if (call.analysis.structuredData) {
        console.log('STRUCTURED DATA:');
        console.log(JSON.stringify(call.analysis.structuredData, null, 2));
        console.log('');
      }
    } else {
      console.log('No analysis available yet. Analysis runs after the call ends.');
      console.log('');
    }

    // Structured outputs from artifact
    if (call.artifact?.structuredOutputs) {
      console.log('=== STRUCTURED OUTPUTS ===');
      console.log('');
      for (const [outputId, output] of Object.entries(call.artifact.structuredOutputs)) {
        console.log(`Output: ${output.name || outputId}`);
        console.log('Result:');
        console.log(JSON.stringify(output.result, null, 2));
        console.log('');
      }
    }

  } catch (error) {
    console.error('Failed to get analysis:', error.message);
    process.exit(1);
  }
}

main();
