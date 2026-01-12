import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '../../components/ui';
import { Plus, Pencil } from 'lucide-react';
import { useConsultations } from './hooks/useConsultations';
import { AddConsultationModal } from './components/AddConsultationModal';
import { EditConsultationModal } from './components/EditConsultationModal';
import type { Consultation } from './types';


export function ConsultationsPage() {
  const { data: consultations = [], isLoading, error } = useConsultations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConsultation, setEditingConsultation] = useState<Consultation | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading consultations</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#000000]">Consultations</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Consultation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultations.map((consultation) => (
          <Card key={consultation.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{consultation.date}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingConsultation(consultation)}
                aria-label="Edit consultation"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-[#666666]">Animal ID: {consultation.animalId}</p>
              <p className="text-[#666666]">{consultation.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <EditConsultationModal
        isOpen={!!editingConsultation}
        onClose={() => setEditingConsultation(null)}
        consultation={editingConsultation}
      />
    </div>
  );
}
