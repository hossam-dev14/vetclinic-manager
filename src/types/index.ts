export type Owner = {
  id: string;
  name: string;
  phone: string;
};

export type Animal = {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Bird' | 'Other';
  ownerId: string;
};

export type Consultation = {
  id: string;
  animalId: string;
  date: string;
  summary: string;
};

export type Document = {
  id: string;
  name: string;
  animalId: string;
};

// User and Auth types
export type UserRole = 'admin' | 'vet';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

// Extended types with relations
export type AnimalWithOwner = Animal & {
  owner?: Owner;
};

export type ConsultationWithAnimal = Consultation & {
  animal?: AnimalWithOwner;
};

export type DocumentWithAnimal = Document & {
  animal?: AnimalWithOwner;
};
