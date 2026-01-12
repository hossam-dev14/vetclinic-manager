import { apiFetch } from '../../../lib/api-client';
import type { Owner } from '../types';

export const ownersApi = {
  getAll: () => apiFetch<Owner[]>('/owners'),
  getById: (id: string) => apiFetch<Owner>(`/owners/${id}`),
  create: (data: Omit<Owner, 'id'>) => apiFetch<Owner>('/owners', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Owner>) => apiFetch<Owner>(`/owners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiFetch<void>(`/owners/${id}`, {
    method: 'DELETE',
  }),
};
