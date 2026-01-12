import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddConsultationModal } from '../AddConsultationModal';
import { useCreateConsultation } from '../../hooks/useConsultations';
import { useAnimals } from '../../../animals/hooks/useAnimals';

// Mock the hooks
vi.mock('../../hooks/useConsultations', () => ({
  useCreateConsultation: vi.fn(),
}));

vi.mock('../../../animals/hooks/useAnimals', () => ({
  useAnimals: vi.fn(),
}));

describe('AddConsultationModal', () => {
  const mockCreateConsultation = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useCreateConsultation).mockReturnValue({
      mutate: mockCreateConsultation,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    vi.mocked(useAnimals).mockReturnValue({
      data: [
        { id: '1', name: 'Buddy', species: 'Dog', ownerId: '1' },
        { id: '2', name: 'Whiskers', species: 'Cat', ownerId: '2' },
      ],
      isLoading: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open', () => {
    render(<AddConsultationModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Add New Consultation')).toBeInTheDocument();
    expect(screen.getByLabelText(/animal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/summary/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddConsultationModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText('Add New Consultation')).not.toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AddConsultationModal isOpen={true} onClose={mockOnClose} />);
    
    // Clear summary just in case
    const summaryInput = screen.getByLabelText(/summary/i);
    fireEvent.change(summaryInput, { target: { value: '' } });

    const submitBtn = screen.getByRole('button', { name: /create consultation/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Animal is required')).toBeInTheDocument();
      expect(screen.getByText('Summary is required')).toBeInTheDocument();
    });
    
    expect(mockCreateConsultation).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<AddConsultationModal isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.change(screen.getByLabelText(/animal/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-10-25' } });
    fireEvent.change(screen.getByLabelText(/summary/i), { target: { value: 'Routine checkup' } });
    
    const submitBtn = screen.getByRole('button', { name: /create consultation/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateConsultation).toHaveBeenCalledWith({
        animalId: '1',
        date: '2023-10-25',
        summary: 'Routine checkup',
      });
    });
  });

  it('closes modal on cancel', () => {
    render(<AddConsultationModal isOpen={true} onClose={mockOnClose} />);
    
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
