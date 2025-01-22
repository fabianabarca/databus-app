import {Config} from '@/api/api-config';

export class Api {
  private static _instance: Api;

  public static getInstance(baseUrl?: string, apiToken?: string): Api {
    if (!Api._instance) {
      Config.setConfig({baseUrl, apiToken});
      Api._instance = new Api();
    }
    return Api._instance;
  }

  public async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const baseUrl = Config.getBaseUrl();
    const apiToken = Config.getApiToken();

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
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
}
