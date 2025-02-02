/*
 * A file ./.env should be created with the following values:
    EXPO_PUBLIC_BASE_URL=https://realtime.bucr.digital/api
*/
export class Config {
  public static _baseUrl: string = process.env.EXPO_PUBLIC_BASE_URL || '';

  /**
   * Update the configuration with optional baseUrl and apiToken.
   * Only non-empty strings or non-undefined values will update the attributes.
   */
  static setConfig({baseUrl}: {baseUrl?: string}) {
    if (baseUrl && baseUrl.trim() !== '') {
      this._baseUrl = baseUrl;
    }
  }

  static getBaseUrl(): string {
    if (!this._baseUrl) {
      throw new Error('Base URL is not configured');
    }
    return this._baseUrl;
  }
}
