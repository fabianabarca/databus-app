class Api {
  private static _instance: Api;
  private baseUrl: string;
  private api_token: string;

  private constructor(baseUrl: string, api_token: string) {
    this.baseUrl = baseUrl;
    this.api_token = api_token;
  }

  public static getInstance(baseUrl: string, api_token: string): Api {
    if (!Api._instance) {
      Api._instance = new Api(baseUrl, api_token);
    }
    return Api._instance;
  }

  public getUser(userId: string): Promise<User> {
    return this.request<User>(`/user/${userId}`, {method: 'GET'});
  }

  public createPost(post: Post): Promise<Post> {
    return this.request<Post>(`/posts`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(post),
    });
  }

  private async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}${endpoint}?api_key=${this.api_token}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }
}
