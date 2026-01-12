import { apiFetch } from '../../../lib/api-client';
import { animalsApi } from '../../animals/api';
import type { DocumentWithAnimal } from '../types';

const documentsApiCore = {
  getAll: () => apiFetch<Document[]>('/documents'),
  getById: (id: string) => apiFetch<Document>(`/documents/${id}`),
  create: (data: Omit<Document, 'id'>) => apiFetch<Document>('/documents', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Document>) => apiFetch<Document>(`/documents/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiFetch<void>(`/documents/${id}`, {
    method: 'DELETE',
  }),
};

export const documentsApi = {
  ...documentsApiCore,
  getWithAnimals: async (): Promise<DocumentWithAnimal[]> => {
    const [documents, animals] = await Promise.all([
      documentsApiCore.getAll(),
      animalsApi.getAll(),
    ]);

    return documents.map((doc) => ({
      ...doc,
      animal: animals.find((a) => a.id === doc.animalId),
    }));
  },
};
