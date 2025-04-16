interface IOptions {
  headers?: Record<string, string>;
  method?: string;
  body?: {
    [key: string]: string;
  };
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = "http://localhost:8000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint: string, options: IOptions = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config: RequestInit = {
        method: options.method || "POST",
        headers,
        credentials: "include",
      };

      // Only add body for non-GET requests
      if (options.body && options.method !== "GET") {
        config.body = JSON.stringify(options.body);
      }

      console.log(`Fetching ${url}`);
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error status: ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async signUp(username: string, email: string, password: string) {
    try {
      return await this.customFetch("/users/register", {
        method: "POST",
        body: {
          username,
          email,
          password,
        },
      });
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      return await this.customFetch("/users/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async signOut() {
    try {
      return await this.customFetch("/users/logout", {
        method: "GET",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  async getUser() {
    try {
      return await this.customFetch("/users/me", {
        method: "GET",
      });
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
