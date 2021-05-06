import type { L10NContent } from '../types/common.types';

async function fetchContent(): Promise<L10NContent> {
  const lang = document.documentElement.lang;
  const resp = await fetch(`/content/${lang}.json`);

  if (!resp.ok) {
    throw new APIError({ msg: 'NO_L10N_CONTENT_FOUND' }, resp.status);
  }

  return resp.json();
}

async function makePostRequest<T>(url: string, body: Record<string, unknown>, token?: string): Promise<T> {
  const headers = {
    'content-type': 'application/json',
    authorization: token || '',
  };

  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body: JSON.stringify(body || {}),
  });
  const respBody = await resp.json();

  if (!resp.ok) {
    throw new APIError(respBody, resp.status);
  }
  return respBody;
}

class APIError extends Error {
  statusCode: number;
  response: unknown;

  constructor(response: unknown, statusCode: number) {
    super('API_CALL_FAILED');
    this.response = response;
    this.statusCode = statusCode || 500;
  }
}

export { makePostRequest, fetchContent, APIError };
