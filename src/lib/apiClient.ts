import { env } from '@/src/config/env';
import { supabase } from './supabase';

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

type AuthMode = 'required' | 'optional' | 'none';

interface ApiInit extends RequestInit {
  auth?: AuthMode;
  timeout?: number;
}

async function getAuthToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  init: ApiInit = {}
): Promise<T> {
  const { auth = 'required', timeout = 30000, ...fetchInit } = init;

  // Get auth token if needed
  let token: string | null = null;
  if (auth !== 'none') {
    token = await getAuthToken();
    if (auth === 'required' && !token) {
      throw new AuthError('Authentication required');
    }
  }

  // Build headers
  const headers = new Headers(fetchInit.headers);
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${env.apiUrl}${path}`, {
      ...fetchInit,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Handle 401 - try to refresh token
    if (response.status === 401 && auth !== 'none') {
      const { data, error } = await supabase.auth.refreshSession();
      if (error || !data.session) {
        throw new AuthError('Session expired');
      }

      // Retry with new token
      headers.set('Authorization', `Bearer ${data.session.access_token}`);
      const retryResponse = await fetch(`${env.apiUrl}${path}`, {
        ...fetchInit,
        headers,
      });

      if (!retryResponse.ok) {
        const errorData = await retryResponse.json().catch(() => ({}));
        throw new APIError(
          errorData.message || 'API request failed',
          retryResponse.status,
          errorData
        );
      }

      return retryResponse.json();
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || 'API request failed',
        response.status,
        errorData
      );
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) {
      return {} as T;
    }

    return JSON.parse(text);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof APIError || error instanceof AuthError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timeout');
      }
      throw new NetworkError(error.message);
    }

    throw new NetworkError('Unknown error occurred');
  }
}

// Convenience methods
export const api = {
  get: <T>(path: string, init?: ApiInit) =>
    apiFetch<T>(path, { ...init, method: 'GET' }),

  post: <T>(path: string, body?: unknown, init?: ApiInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(path: string, body?: unknown, init?: ApiInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(path: string, body?: unknown, init?: ApiInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(path: string, init?: ApiInit) =>
    apiFetch<T>(path, { ...init, method: 'DELETE' }),
};
