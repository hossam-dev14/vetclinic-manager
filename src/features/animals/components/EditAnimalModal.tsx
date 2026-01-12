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
import { Modal } from '../../../components/modals/Modal';
import { useUpdateAnimal } from '../hooks/useAnimals';
import { useOwners } from '../../owners/hooks/useOwners';
import { animalSchema, type Animal } from '../types';
import { Button } from '../../../components/ui';

interface EditAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  animal: Animal | null;
}

type AnimalFormValues = Omit<Animal, 'id'>;

export function EditAnimalModal({ isOpen, onClose, animal }: EditAnimalModalProps) {
  const { mutate: updateAnimal, isPending, isSuccess, error } = useUpdateAnimal();
  const { data: owners = [], isLoading: isLoadingOwners } = useOwners();

  const form = useForm<AnimalFormValues>({
    resolver: zodResolver(animalSchema.omit({ id: true })),
    defaultValues: {
      name: '',
      species: 'Dog',
      ownerId: '',
    },
  });

  useEffect(() => {
    if (isOpen && animal) {
      form.reset({
        name: animal.name,
        species: animal.species,
        ownerId: animal.ownerId,
      });
    }
  }, [isOpen, animal, form]);

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSubmit = (data: AnimalFormValues) => {
    if (animal?.id) {
      updateAnimal({ id: animal.id, data });
    }
  };

  const speciesOptions = [
    { value: 'Dog', label: 'Dog' },
    { value: 'Cat', label: 'Cat' },
    { value: 'Bird', label: 'Bird' },
    { value: 'Other', label: 'Other' },
  ];

  const ownerOptions = owners.map((owner) => ({
    value: owner.id,
    label: owner.name,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Animal"
      description="Update the details of the animal."
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Buddy" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="species"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Species</FormLabel>
                <FormControl>
                  <Select
                    options={speciesOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ownerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner</FormLabel>
                <FormControl>
                  <Select
                    disabled={isLoadingOwners}
                    placeholder="Select an owner"
                    {...field}
                  >
                    <option value="" disabled>
                      Select an owner
                    </option>
                    {ownerOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
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
              {isPending ? 'Updating...' : 'Update Animal'}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
