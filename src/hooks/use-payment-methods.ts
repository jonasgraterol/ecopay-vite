import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentMethodsService, type PaymentMethod, type PaymentMethodQuery } from '@/services/payment-methods';

export const paymentMethodKeys = {
  all: ['paymentMethods'] as const,
  lists: () => [...paymentMethodKeys.all, 'list'] as const,
  list: (filters: PaymentMethodQuery) => [...paymentMethodKeys.lists(), filters] as const,
  details: () => [...paymentMethodKeys.all, 'detail'] as const,
  detail: (id: string) => [...paymentMethodKeys.details(), id] as const,
};

export function usePaymentMethods(query: PaymentMethodQuery = {}) {
  return useQuery({
    queryKey: paymentMethodKeys.list(query),
    queryFn: () => paymentMethodsService.list(query),
  });
}

export function usePaymentMethod(id: string) {
  return useQuery({
    queryKey: paymentMethodKeys.detail(id),
    queryFn: () => paymentMethodsService.get(id),
  });
}

export function useCreatePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<PaymentMethod>) => paymentMethodsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentMethodKeys.lists() });
    },
  });
}

export function useUpdatePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PaymentMethod> }) =>
      paymentMethodsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: paymentMethodKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: paymentMethodKeys.lists() });
    },
  });
}

export function useRemovePaymentMethod() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentMethodsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: paymentMethodKeys.lists() });
    },
  });
}
