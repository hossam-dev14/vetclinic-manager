import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/forms/Form';
import { Input } from '../../../components/forms/Input';
import { Select } from '../../../components/forms/Select';
import { Textarea } from '../../../components/forms/Textarea';
import { Modal } from '../../../components/modals/Modal';
import { useUpdateConsultation } from '../hooks/useConsultations';
import { useAnimals } from '../../animals/hooks/useAnimals';
import { consultationSchema, type Consultation } from '../types';
import { Button } from '../../../components/ui';

interface EditConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultation: Consultation | null;
}

type ConsultationFormValues = Omit<Consultation, 'id'>;

export function EditConsultationModal({ isOpen, onClose, consultation }: EditConsultationModalProps) {
  const { mutate: updateConsultation, isPending, isSuccess, error } = useUpdateConsultation();
  const { data: animals = [], isLoading: isLoadingAnimals } = useAnimals();

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema.omit({ id: true })),
    defaultValues: {
      animalId: '',
      date: '',
      summary: '',
    },
  });

  useEffect(() => {
    if (isOpen && consultation) {
      form.reset({
        animalId: consultation.animalId,
        date: consultation.date,
        summary: consultation.summary,
      });
    }
  }, [isOpen, consultation, form]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSubmit = (data: ConsultationFormValues) => {
    if (consultation?.id) {
      updateConsultation({ id: consultation.id, data });
    }
  };

  const animalOptions = animals.map((animal) => ({
    value: animal.id || '',
    label: animal.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Consultation"
      description="Update the consultation details."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error instanceof Error ? error.message : 'An error occurred'}
            </div>
          )}

          <FormField
            control={form.control}
            name="animalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animal</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoadingAnimals}
                    placeholder="Select an animal"
                    options={animalOptions}
                    {...field}
                  >
                     <option value="" disabled>
                      Select an animal
                    </option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter consultation summary..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Updating...' : 'Update Consultation'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
