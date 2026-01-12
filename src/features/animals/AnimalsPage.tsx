import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { Plus, Pencil } from 'lucide-react';
import { useAnimals } from './hooks/useAnimals';
import { AddAnimalModal } from './components/AddAnimalModal';
import { EditAnimalModal } from './components/EditAnimalModal';
import type { Animal } from './types';

export function AnimalsPage() {
  const { data: animals = [], isLoading, error } = useAnimals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading animals</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Animals</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Animal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals?.map((animal) => (
          <Card key={animal.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{animal.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingAnimal(animal)}
                aria-label="Edit animal"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Species: {animal.species}</p>
              <p className="text-[#666666]">Owner ID: {animal.ownerId}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddAnimalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EditAnimalModal
        isOpen={!!editingAnimal}
        onClose={() => setEditingAnimal(null)}
        animal={editingAnimal}
      />
    </div>
  );
}
