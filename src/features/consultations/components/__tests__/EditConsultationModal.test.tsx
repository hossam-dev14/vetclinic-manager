import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditConsultationModal } from '../EditConsultationModal';
import { useUpdateConsultation } from '../../hooks/useConsultations';
import { useAnimals } from '../../../animals/hooks/useAnimals';

// Mock the hooks
vi.mock('../../hooks/useConsultations', () => ({
  useUpdateConsultation: vi.fn(),
}));

vi.mock('../../../animals/hooks/useAnimals', () => ({
  useAnimals: vi.fn(),
}));

describe('EditConsultationModal', () => {
  const mockUpdateConsultation = vi.fn();
  const mockOnClose = vi.fn();
  const mockConsultation = {
    id: '1',
    animalId: 'animal1',
    date: '2023-10-27',
    summary: 'Routine checkup',
  };

  const mockAnimals = [
    { id: 'animal1', name: 'Buddy' },
    { id: 'animal2', name: 'Max' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUpdateConsultation).mockReturnValue({
      mutate: mockUpdateConsultation,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    vi.mocked(useAnimals).mockReturnValue({
      data: mockAnimals,
      isLoading: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open with consultation data', () => {
    render(<EditConsultationModal isOpen={true} onClose={mockOnClose} consultation={mockConsultation} />);

    expect(screen.getByText('Edit Consultation')).toBeInTheDocument();
    expect(screen.getByLabelText(/animal/i)).toHaveValue('animal1');
    expect(screen.getByLabelText(/date/i)).toHaveValue('2023-10-27');
    expect(screen.getByLabelText(/summary/i)).toHaveValue('Routine checkup');
  });

  it('submits form with updated data', async () => {
    render(<EditConsultationModal isOpen={true} onClose={mockOnClose} consultation={mockConsultation} />);

    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Follow-up visit' } });

    const submitBtn = screen.getByRole('button', { name: /update consultation/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateConsultation).toHaveBeenCalledWith({
        id: '1',
        data: {
          animalId: 'animal1',
          date: '2023-10-27',
          summary: 'Follow-up visit',
        },
      });
    });
  });
});
