import { apiClient } from '@/lib/api-client';

export interface PaymentMethod {
  id: string;
  alias: string;
  cardNumber: string;
  cardholderName: string;
  expirationDate: string;
  securityNumber: string;
  userId: number;
}

export interface PaymentMethodQuery {
  $limit?: number;
  $skip?: number;
  $sort?: {
    [key: string]: 1 | -1;
  };
  userId?: number;
}

export const paymentMethodsService = {
  async list(query: PaymentMethodQuery = {}) {
    const response = await apiClient.get('/payment-method', { params: query });
    return response.data;
  },

  async get(id: string) {
    const response = await apiClient.get(`/payment-method/${id}`);
    return response.data;
  },

  async create(data: Partial<PaymentMethod>) {
    const response = await apiClient.post('/payment-method', data);
    return response.data;
  },

  async update(id: string, data: Partial<PaymentMethod>) {
    const response = await apiClient.patch(`/payment-method/${id}`, data);
    return response.data;
  },

  async remove(id: string) {
    const response = await apiClient.delete(`/payment-method/${id}`);
    return response.data;
  },
};
