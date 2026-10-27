/**
 * Zenith Client API Library
 * Provides an isomorphic HTTP client compatible with @appdeploy/client and Axios interfaces.
 */

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError extends Error {
  response?: {
    status: number;
    data: any;
  };
}

export const api = {
  async get<T = any>(url: string, config?: { headers?: Record<string, string> }): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(config?.headers || {}),
      },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error: ApiError = new Error(data.message || `Request failed with status ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, statusText: res.statusText };
  },

  async post<T = any>(url: string, body?: any, config?: { headers?: Record<string, string> }): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(config?.headers || {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error: ApiError = new Error(data.message || `Request failed with status ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, statusText: res.statusText };
  },

  async put<T = any>(url: string, body?: any, config?: { headers?: Record<string, string> }): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(config?.headers || {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error: ApiError = new Error(data.message || `Request failed with status ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, statusText: res.statusText };
  },

  async delete<T = any>(url: string, config?: { headers?: Record<string, string> }): Promise<ApiResponse<T>> {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        ...(config?.headers || {}),
      },
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error: ApiError = new Error(data.message || `Request failed with status ${res.status}`);
      error.response = { status: res.status, data };
      throw error;
    }

    return { data, status: res.status, statusText: res.statusText };
  },
};

export default api;
