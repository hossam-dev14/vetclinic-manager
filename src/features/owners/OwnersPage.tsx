import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { ownersApi } from '../../lib/api';
import { Plus } from 'lucide-react';
import type { Owner } from '../../types';

export function OwnersPage() {
  const { data: owners = [], isLoading, error } = useQuery({
    queryKey: ['owners'],
    queryFn: ownersApi.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading owners</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Owners</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Owner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {owners.map((owner: Owner) => (
          <Card key={owner.id}>
            <CardHeader>
              <CardTitle>{owner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Phone: {owner.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
