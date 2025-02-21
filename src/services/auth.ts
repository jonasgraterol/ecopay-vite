import { apiClient } from '@/lib/api-client';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await apiClient.post('/users', data);
    return response.data;
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    const response = await apiClient.post('/authentication', {
      ...data,
      strategy: 'local'
    });
    return response.data;
  },

  async getCurrentUser(): Promise<AuthResponse['user']> {
    const response = await apiClient.get('/users/current');
    return response.data;
  }
};
