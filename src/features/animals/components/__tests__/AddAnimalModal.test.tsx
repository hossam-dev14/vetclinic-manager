import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddAnimalModal } from '../AddAnimalModal';
import { useCreateAnimal } from '../../hooks/useAnimals';
import { useOwners } from '../../../owners/hooks/useOwners';

// Mock the hooks
vi.mock('../../hooks/useAnimals', () => ({
  useCreateAnimal: vi.fn(),
}));

vi.mock('../../../owners/hooks/useOwners', () => ({
  useOwners: vi.fn(),
}));

describe('AddAnimalModal', () => {
  const mockCreateAnimal = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    vi.mocked(useCreateAnimal).mockReturnValue({
      mutate: mockCreateAnimal,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    vi.mocked(useOwners).mockReturnValue({
      data: [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123', address: '123 St' },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com', phone: '456', address: '456 St' },
      ],
      isLoading: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open', () => {
    render(<AddAnimalModal isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByText('Add New Animal')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/owner/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddAnimalModal isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByText('Add New Animal')).not.toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AddAnimalModal isOpen={true} onClose={mockOnClose} />);
    
    const submitBtn = screen.getByRole('button', { name: /create animal/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      // Species has default 'Dog'
      expect(screen.getByText('Owner is required')).toBeInTheDocument();
    });
    
    expect(mockCreateAnimal).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<AddAnimalModal isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rex' } });
    fireEvent.change(screen.getByLabelText(/species/i), { target: { value: 'Dog' } });
    fireEvent.change(screen.getByLabelText(/owner/i), { target: { value: '1' } });
    
    const submitBtn = screen.getByRole('button', { name: /create animal/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateAnimal).toHaveBeenCalledWith({
        name: 'Rex',
        species: 'Dog',
        ownerId: '1',
      });
    });
  });

  it('closes modal on cancel', () => {
    render(<AddAnimalModal isOpen={true} onClose={mockOnClose} />);
    
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
