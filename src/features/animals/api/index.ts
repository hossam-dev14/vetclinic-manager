import { apiFetch } from '../../../lib/api-client';
import type { Animal } from '../types';

export const animalsApi = {
  getAll: () => apiFetch<Animal[]>('/animals'),
  getById: (id: string) => apiFetch<Animal>(`/animals/${id}`),
  create: (data: Omit<Animal, 'id'>) => apiFetch<Animal>('/animals', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Animal>) => apiFetch<Animal>(`/animals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiFetch<void>(`/animals/${id}`, {
    method: 'DELETE',
  }),
};
