import type { Owner, Animal, Consultation, Document } from '../types';

// API utilities for VetClinic Manager
// Based on API_ROUTES.md

const API_BASE_URL = 'http://localhost:5000';

// Generic API helper
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Generic CRUD operations factory
function createApiService<T>(resource: string) {
  return {
    getAll: () => apiFetch<T[]>(`/${resource}`),
    getById: (id: string) => apiFetch<T>(`/${resource}/${id}`),
    create: (data: Omit<T, 'id'>) => apiFetch<T>(`/${resource}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: Partial<T>) => apiFetch<T>(`/${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id: string) => apiFetch<void>(`/${resource}/${id}`, {
      method: 'DELETE',
    }),
  };
}

// Export API services for each resource
export const ownersApi = createApiService<Owner>('owners');
export const animalsApi = createApiService<Animal>('animals');
export const consultationsApi = createApiService<Consultation>('consultations');
export const documentsApi = createApiService<Document>('documents');

// Helper functions for enriched data
export async function getAnimalsWithOwners() {
  const [animals, owners] = await Promise.all([
    animalsApi.getAll(),
    ownersApi.getAll(),
  ]);

  return animals.map((animal: Animal) => ({
    ...animal,
    owner: owners.find((owner: Owner) => owner.id === animal.ownerId),
  }));
}

export async function getConsultationsWithAnimals() {
  const [consultations, animals, owners] = await Promise.all([
    consultationsApi.getAll(),
    animalsApi.getAll(),
    ownersApi.getAll(),
  ]);

  return consultations.map((consultation: Consultation) => {
    const animal = animals.find((a: Animal) => a.id === consultation.animalId);
    return {
      ...consultation,
      animal: animal ? {
        ...animal,
        owner: owners.find((o: Owner) => o.id === animal.ownerId),
      } : undefined,
    };
  });
}

export async function getDocumentsWithAnimals() {
  const [documents, animals, owners] = await Promise.all([
    documentsApi.getAll(),
    animalsApi.getAll(),
    ownersApi.getAll(),
  ]);

  return documents.map((document: Document) => {
    const animal = animals.find((a: Animal) => a.id === document.animalId);
    return {
      ...document,
      animal: animal ? {
        ...animal,
        owner: owners.find((o: Owner) => o.id === animal.ownerId),
      } : undefined,
    };
  });
}
