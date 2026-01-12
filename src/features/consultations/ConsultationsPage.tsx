import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { consultationsApi } from '../../lib/api';
import { Plus } from 'lucide-react';

export function ConsultationsPage() {
  const { data: consultations = [], isLoading, error } = useQuery({
    queryKey: ['consultations'],
    queryFn: consultationsApi.getAll,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading consultations</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Consultations</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Consultation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultations.map((consultation) => (
          <Card key={consultation.id}>
            <CardHeader>
              <CardTitle>{consultation.date}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Animal ID: {consultation.animalId}</p>
              <p className="text-[#666666]">{consultation.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
