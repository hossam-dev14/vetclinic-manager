import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ownersApi } from '../api';
import type { Owner } from '../types';

// Query Keys Factory
export const ownerKeys = {
  all: ['owners'] as const,
  lists: () => [...ownerKeys.all, 'list'] as const,
  detail: (id: string) => [...ownerKeys.all, 'detail', id] as const,
};

// Hooks
export function useOwners() {
  return useQuery({
    queryKey: ownerKeys.lists(),
    queryFn: ownersApi.getAll,
  });
}

export function useOwner(id: string) {
  return useQuery({
    queryKey: ownerKeys.detail(id),
    queryFn: () => ownersApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateOwner() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ownersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
}

export function useUpdateOwner() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Owner> }) => 
      ownersApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: ownerKeys.detail(data.id) });
      }
    },
  });
}

export function useDeleteOwner() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ownersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.lists() });
    },
  });
}
