import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { Plus, Pencil } from 'lucide-react';
import { useOwners } from './hooks/useOwners';
import { AddOwnerModal } from './components/AddOwnerModal';
import { EditOwnerModal } from './components/EditOwnerModal';
import type { Owner } from './types';

export function OwnersPage() {
  const { data: owners = [], isLoading, error } = useOwners();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOwner, setEditingOwner] = useState<Owner | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading owners</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Owners</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Owner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {owners.map((owner) => (
          <Card key={owner.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{owner.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingOwner(owner)}
                aria-label="Edit owner"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Phone: {owner.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddOwnerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EditOwnerModal
        isOpen={!!editingOwner}
        onClose={() => setEditingOwner(null)}
        owner={editingOwner}
      />
    </div>
  );
}
