import { apiClient } from '@/lib/api-client';

export interface Transaction {
  id: string;
  amount: number;
  usdt: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  currency: string;
  userId: number;
  paymentMethodId: number;
  walletAddress: string;
  network: string;
  cryptoCurrency: string;
  cryptoAmount: number;
  blockchainTransactionId: number;
  walletId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionQuery {
  $limit?: number;
  $skip?: number;
  $sort?: {
    [key: string]: 1 | -1;
  };
  userId?: number;
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
