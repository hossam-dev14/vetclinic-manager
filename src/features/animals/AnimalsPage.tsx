import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { animalsApi } from '../../lib/api';
import { Plus } from 'lucide-react';

export function AnimalsPage() {
  const { data: animals = [], isLoading, error } = useQuery({
    queryKey: ['animals'],
    queryFn: animalsApi.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading animals</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Animals</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Animal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id}>
            <CardHeader>
              <CardTitle>{animal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Species: {animal.species}</p>
              <p className="text-[#666666]">Owner ID: {animal.ownerId}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
