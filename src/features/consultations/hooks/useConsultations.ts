import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { consultationsApi } from '../api';
import type { Consultation } from '../types';

// Query Keys Factory
export const consultationKeys = {
  all: ['consultations'] as const,
  lists: () => [...consultationKeys.all, 'list'] as const,
  detail: (id: string) => [...consultationKeys.all, 'detail', id] as const,
};

// Hooks
export function useConsultations() {
  return useQuery({
    queryKey: consultationKeys.lists(),
    queryFn: consultationsApi.getAll,
  });
}

export function useConsultation(id: string) {
  return useQuery({
    queryKey: consultationKeys.detail(id),
    queryFn: () => consultationsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateConsultation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: consultationsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
    },
  });
}

export function useUpdateConsultation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Consultation> }) => 
      consultationsApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: consultationKeys.detail(data.id) });
      }
    },
  });
}

export function useDeleteConsultation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: consultationsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: consultationKeys.lists() });
    },
  });
}
