import axios, { AxiosRequestConfig, AxiosError } from 'axios';

class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    constructor() {
        this.baseURL = "http://localhost:8000/api/v1";
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    async customFetch(endpoint: string, options: AxiosRequestConfig) {
        try {
            // Set the URL first
            const url = `${this.baseURL}${endpoint}`;
            // Set the headers
            const headers = {
                ...this.defaultHeaders,
                ...options.headers,
            };
            // Set the config
            const config = {
                ...options,
                headers,
                withCredentials: true
            };
            // Make the request
            const response = await axios.post(url, options.data, config);
            console.log("Fetched data: ", response.data);
            
            return response;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error fetching data:", error.response?.data);
                throw error;
            }
        }
    }

    async signUp(username: string, email: string, password: string) {
        try {
            return await this.customFetch('/users/register', {
                data: {
                    username,
                    email,
                    password,
                },
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error signing up:", error.response?.data);
                throw error;
            }
        }
    }

    async signIn(email: string, password: string) {
        try {
            return await this.customFetch('/users/login', {
                data: {
                    email,
                    password,
                },
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error signing in:", error.response?.data);
                throw error;
            }
        }
    }

    async signOut() {
        try {
            return await this.customFetch('/users/logout', {
                method: 'GET',
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error signing out:", error.response?.data);
                throw error;
            }
        }
    }
    
    async getUser() {
        try {
            return await this.customFetch('/users/me', {
                method: 'GET',
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Error getting user:", error.response?.data);
                throw error;
            }
        }
    }
}

export const apiClient = new ApiClient();