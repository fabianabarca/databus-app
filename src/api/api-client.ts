import {Config} from '@/api/api-config';
import * as SecureStore from 'expo-secure-store';

export class Api {
  private static _instance: Api | null = null;
  private authToken: string | null = null;

  private constructor() {}

  public static getInstance(): Api {
    if (!Api._instance) {
      Api._instance = new Api();
      Api._instance.loadToken();
    }
    return Api._instance;
  }

  public async loadToken(): Promise<string | null> {
    const token = await SecureStore.getItemAsync('authToken');
    if (!this.authToken) {
      this.authToken = token;
    }
    return token;
  }

  public async setAuthToken(token: string) {
    this.authToken = token;
    await SecureStore.setItemAsync('authToken', token);
  }

  public async clearAuthToken() {
    this.authToken = null;
    await SecureStore.deleteItemAsync('authToken');
  }

  private async getAuthHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  public async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const baseUrl = Config.getBaseUrl();
    const headers = {
      ...(await this.getAuthHeaders()),
      ...options.headers,
    };

    // console.log('Headers: ', headers, ' | Endpoint: ', endpoint);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        let errorBody: any = {message: `HTTP Error: ${response.status}`};
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/json')) {
          errorBody = await response.json();
        } else {
          errorBody = {message: `Server error occurred.`};
        }

        throw errorBody;
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
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

  public async logIn(
    username: string,
    password: string,
  ): Promise<{token: string}> {
    try {
      const response = await this.post<
        {token: string},
        {username: string; password: string}
      >('login/', {username, password});

      await this.setAuthToken(response.token);
      return response;
    } catch (error: any) {
      let errorBody: any = {
        message: error.error || 'Unknown error occurred.',
      };
      throw errorBody;
    }
  }
}

export const api = Api.getInstance();
