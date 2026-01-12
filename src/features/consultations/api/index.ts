import { apiFetch } from '../../../lib/api-client';
import type { Consultation } from '../types';

export const consultationsApi = {
  getAll: () => apiFetch<Consultation[]>('/consultations'),
  getById: (id: string) => apiFetch<Consultation>(`/consultations/${id}`),
  create: (data: Omit<Consultation, 'id'>) => apiFetch<Consultation>('/consultations', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Consultation>) => apiFetch<Consultation>(`/consultations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiFetch<void>(`/consultations/${id}`, {
    method: 'DELETE',
  }),
};
