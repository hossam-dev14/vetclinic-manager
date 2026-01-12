import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditAnimalModal } from '../EditAnimalModal';
import { useUpdateAnimal } from '../../hooks/useAnimals';
import { useOwners } from '../../../owners/hooks/useOwners';

// Mock the hooks
vi.mock('../../hooks/useAnimals', () => ({
  useUpdateAnimal: vi.fn(),
}));

vi.mock('../../../owners/hooks/useOwners', () => ({
  useOwners: vi.fn(),
}));

describe('EditAnimalModal', () => {
  const mockUpdateAnimal = vi.fn();
  const mockOnClose = vi.fn();
  const mockAnimal = {
    id: '1',
    name: 'Buddy',
    species: 'Dog',
    ownerId: 'owner1',
  };

  const mockOwners = [
    { id: 'owner1', name: 'John Doe' },
    { id: 'owner2', name: 'Jane Smith' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUpdateAnimal).mockReturnValue({
      mutate: mockUpdateAnimal,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    vi.mocked(useOwners).mockReturnValue({
      data: mockOwners,
      isLoading: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open with animal data', () => {
    render(<EditAnimalModal isOpen={true} onClose={mockOnClose} animal={mockAnimal} />);

    expect(screen.getByText('Edit Animal')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('Buddy');
    expect(screen.getByLabelText(/species/i)).toHaveValue('Dog');
    expect(screen.getByLabelText(/owner/i)).toHaveValue('owner1');
  });

  it('submits form with updated data', async () => {
    render(<EditAnimalModal isOpen={true} onClose={mockOnClose} animal={mockAnimal} />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Max' } });

    const submitBtn = screen.getByRole('button', { name: /update animal/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateAnimal).toHaveBeenCalledWith({
        id: '1',
        data: {
          name: 'Max',
          species: 'Dog',
          ownerId: 'owner1',
        },
      });
    });
  });
});
