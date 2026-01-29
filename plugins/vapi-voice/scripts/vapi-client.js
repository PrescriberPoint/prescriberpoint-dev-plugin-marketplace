/**
 * VAPI API Client
 *
 * Requires VAPI_API_KEY environment variable to be set.
 * Get your API key from https://dashboard.vapi.ai
 */

const VAPI_BASE_URL = 'https://api.vapi.ai';

function getApiKey() {
  const apiKey = process.env.VAPI_API_KEY;
  if (!apiKey) {
    console.error('Error: VAPI_API_KEY environment variable is not set.');
    console.error('');
    console.error('To use VAPI scripts, you must set your API key:');
    console.error('  export VAPI_API_KEY="your-api-key-here"');
    console.error('');
    console.error('Get your API key from: https://dashboard.vapi.ai');
    process.exit(1);
  }
  return apiKey;
}

async function vapiRequest(endpoint, options = {}) {
  const apiKey = getApiKey();

  const url = `${VAPI_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`VAPI API Error (${response.status}): ${error}`);
  }

  return response.json();
}

// Call Management
export async function createCall(config) {
  return vapiRequest('/call', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}

export async function getCall(callId) {
  return vapiRequest(`/call/${callId}`);
}

export async function listCalls(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/call?${query}` : '/call';
  return vapiRequest(endpoint);
}

export async function endCall(callId) {
  return vapiRequest(`/call/${callId}/end`, {
    method: 'POST',
  });
}

// Assistant Management
export async function createAssistant(config) {
  return vapiRequest('/assistant', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}

export async function getAssistant(assistantId) {
  return vapiRequest(`/assistant/${assistantId}`);
}

export async function listAssistants(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/assistant?${query}` : '/assistant';
  return vapiRequest(endpoint);
}

export async function updateAssistant(assistantId, config) {
  return vapiRequest(`/assistant/${assistantId}`, {
    method: 'PATCH',
    body: JSON.stringify(config),
  });
}

export async function deleteAssistant(assistantId) {
  return vapiRequest(`/assistant/${assistantId}`, {
    method: 'DELETE',
  });
}

// Phone Number Management
export async function listPhoneNumbers() {
  return vapiRequest('/phone-number');
}

export async function getPhoneNumber(phoneNumberId) {
  return vapiRequest(`/phone-number/${phoneNumberId}`);
}

// Voice Management
export async function listVoices(params = {}) {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/voice?${query}` : '/voice';
  return vapiRequest(endpoint);
}

export async function getVoice(voiceId) {
  return vapiRequest(`/voice/${voiceId}`);
}

// Export for CLI usage
export { getApiKey, vapiRequest };
