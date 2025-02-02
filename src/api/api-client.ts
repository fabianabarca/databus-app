import {Config} from '@/api/api-config';
import * as SecureStore from 'expo-secure-store';

export class Api {
  private static _instance: Api | null = null;

  private constructor() {}

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
    }
    return Api._instance;
  }

  private async getAuthHeaders() {
    const apiToken = await SecureStore.getItemAsync('authToken');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }

    return headers;
  }

  public async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const baseUrl = Config.getBaseUrl();

    const headers = {
      ...(await this.getAuthHeaders()),
      ...options.headers,
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || `HTTP Error: ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  public async get<T>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<T> {
    const query = new URLSearchParams(params).toString();

    return this.request<T>(`${endpoint}?${query}`, {method: 'GET'});
  }

  public async post<T, U>(endpoint: string, body: U): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async patch<T, U>(endpoint: string, body: U): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  public async signIn(username: string, password: string): Promise<{ token: string, user_id: string }> {
    const response = await this.post<{token: string; user_id: string}, {username: string, password: string}>(
      '/auth/login',
      {username, password},
    );
    return response;
  }
}
