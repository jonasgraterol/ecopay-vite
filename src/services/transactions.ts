import { apiClient } from '@/lib/api-client';

export interface Transaction {
  id: string;
  type: 'Buy' | 'Sell';
  amount: number;
  usdt: number;
  status: 'Completed' | 'Pending';
  date: string;
  userId: number;
}

export interface TransactionQuery {
  $limit?: number;
  $skip?: number;
  $sort?: {
    [key: string]: 1 | -1;
  };
}

export const transactionsService = {
  async list(query: TransactionQuery = {}) {
    const response = await apiClient.get('/transaction', { params: query });
    return response.data;
  },

  async get(id: string) {
    const response = await apiClient.get(`/transaction/${id}`);
    return response.data;
  },

  async create(data: Partial<Transaction>) {
    const response = await apiClient.post('/transaction', data);
    return response.data;
  },

  async update(id: string, data: Partial<Transaction>) {
    const response = await apiClient.patch(`/transaction/${id}`, data);
    return response.data;
  },

  async remove(id: string) {
    const response = await apiClient.delete(`/transaction/${id}`);
    return response.data;
  },
};
