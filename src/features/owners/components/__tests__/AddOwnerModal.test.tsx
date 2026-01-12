import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddOwnerModal } from '../AddOwnerModal';
import { useCreateOwner } from '../../hooks/useOwners';

// Mock the hook
vi.mock('../../hooks/useOwners', () => ({
  useCreateOwner: vi.fn(),
}));

describe('AddOwnerModal', () => {
  const mockCreateOwner = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useCreateOwner).mockReturnValue({
      mutate: mockCreateOwner,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open', () => {
    render(<AddOwnerModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Add New Owner')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<AddOwnerModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Add New Owner')).not.toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<AddOwnerModal isOpen={true} onClose={mockOnClose} />);

    const submitBtn = screen.getByRole('button', { name: /create owner/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      expect(screen.getByText('Phone must be at least 10 characters')).toBeInTheDocument();
      expect(screen.getByText('Address must be at least 5 characters')).toBeInTheDocument();
    });

    expect(mockCreateOwner).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<AddOwnerModal isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '456 Oak St' } });

    const submitBtn = screen.getByRole('button', { name: /create owner/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockCreateOwner).toHaveBeenCalledWith({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '1234567890',
        address: '456 Oak St',
      });
    });
  });

  it('closes modal on cancel', () => {
    render(<AddOwnerModal isOpen={true} onClose={mockOnClose} />);

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
