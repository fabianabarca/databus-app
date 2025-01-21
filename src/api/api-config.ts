/*
 * A file ./.env should be created with the following values:
    EXPO_PUBLIC_BASE_URL=https://realtime.bucr.digital/api
    EXPO_PUBLIC_API_TOKEN={BearerToken}
*/
export class Config {
  public static _baseUrl: string = process.env.EXPO_PUBLIC_BASE_URL || '';
  public static _apiToken: string = process.env.EXPO_PUBLIC_API_TOKEN || '';

  /**
   * Update the configuration with optional baseUrl and apiToken.
   * Only non-empty strings or non-undefined values will update the attributes.
   */
  static setConfig({baseUrl, apiToken}: {baseUrl?: string; apiToken?: string}) {
    if (baseUrl && baseUrl.trim() !== '') {
      this._baseUrl = baseUrl;
    }
    if (apiToken && apiToken.trim() !== '') {
      this._apiToken = apiToken;
    }
  }

  static getBaseUrl(): string {
    if (!this._baseUrl) {
      throw new Error('Base URL is not configured');
    }
    return this._baseUrl;
  }

  static getApiToken(): string {
    if (!this._apiToken) {
      throw new Error('Api Token not configured');
    }
    return this._apiToken;
  }
}
