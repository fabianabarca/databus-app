import {Config} from '@/api/api-config';
import * as SecureStore from 'expo-secure-store';
import {lightGreen100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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
      Accept: 'application/json',
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

    // console.log('Endpoint: ', `${baseUrl}${endpoint}`);
    // console.log('Options: ', options);
    // console.log(headers);

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const contentType = response.headers.get('content-type');

      if (!response.ok) {
        let errorBody: any = {message: `HTTP Error: ${response.status}`};

        if (contentType?.includes('application/json')) {
          errorBody = await response.json();
        } else {
          const errorText = await response.text();
          console.error('Server Error Page:', errorText);
          errorBody = {
            message: `Server error occurred. Please try again later.`,
          };
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

      return response;
    } catch (error: any) {
      let errorBody: any = {
        message: error.message || 'Unknown error occurred.',
      };
      if (error?.non_field_errors) {
        errorBody = {message: error.non_field_errors.join(' ')};
      }
      throw errorBody;
    }
  }
}

export const api = Api.getInstance();
