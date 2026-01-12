import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EditOwnerModal } from '../EditOwnerModal';
import { useUpdateOwner } from '../../hooks/useOwners';

// Mock the hook
vi.mock('../../hooks/useOwners', () => ({
  useUpdateOwner: vi.fn(),
}));

describe('EditOwnerModal', () => {
  const mockUpdateOwner = vi.fn();
  const mockOnClose = vi.fn();
  const mockOwner = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    address: '123 Main St',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUpdateOwner).mockReturnValue({
      mutate: mockUpdateOwner,
      isPending: false,
      isSuccess: false,
      error: null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  });

  it('renders correctly when open with owner data', () => {
    render(<EditOwnerModal isOpen={true} onClose={mockOnClose} owner={mockOwner} />);

    expect(screen.getByText('Edit Owner')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('1234567890');
    expect(screen.getByLabelText(/address/i)).toHaveValue('123 Main St');
  });

  it('does not render when closed', () => {
    render(<EditOwnerModal isOpen={false} onClose={mockOnClose} owner={mockOwner} />);

    expect(screen.queryByText('Edit Owner')).not.toBeInTheDocument();
  });

  it('submits form with updated data', async () => {
    render(<EditOwnerModal isOpen={true} onClose={mockOnClose} owner={mockOwner} />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });

    const submitBtn = screen.getByRole('button', { name: /update owner/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateOwner).toHaveBeenCalledWith({
        id: '1',
        data: {
          name: 'Jane Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St',
        },
      });
    });
  });

  it('closes modal on cancel', () => {
    render(<EditOwnerModal isOpen={true} onClose={mockOnClose} owner={mockOwner} />);

    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
