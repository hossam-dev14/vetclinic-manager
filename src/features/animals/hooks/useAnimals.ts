import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { animalsApi } from '../api';
import type { Animal } from '../types';

// Query Keys Factory
export const animalKeys = {
  all: ['animals'] as const,
  lists: () => [...animalKeys.all, 'list'] as const,
  detail: (id: string) => [...animalKeys.all, 'detail', id] as const,
};

// Hooks
export function useAnimals() {
  return useQuery({
    queryKey: animalKeys.lists(),
    queryFn: animalsApi.getAll,
  });
}

export function useAnimal(id: string) {
  return useQuery({
    queryKey: animalKeys.detail(id),
    queryFn: () => animalsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateAnimal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: animalsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
    },
  });
}

export function useUpdateAnimal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Animal> }) => 
      animalsApi.update(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
      if (data.id) {
        queryClient.invalidateQueries({ queryKey: animalKeys.detail(data.id) });
      }
    },
  });
}

export function useDeleteAnimal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: animalsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: animalKeys.lists() });
    },
  });
}
