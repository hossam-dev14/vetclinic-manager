import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the features to isolate App logic
vi.mock('./features/auth', () => ({
  LoginPage: () => <div data-testid="login-page">Login Page</div>
}));

vi.mock('./features/dashboard/Dashboard', () => ({
  Dashboard: () => <div data-testid="dashboard-page">Dashboard</div>
}));

vi.mock('./features/owners/OwnersPage', () => ({
  OwnersPage: () => <div data-testid="owners-page">Owners Page</div>
}));

vi.mock('./features/animals/AnimalsPage', () => ({
  AnimalsPage: () => <div data-testid="animals-page">Animals Page</div>
}));

vi.mock('./features/consultations/ConsultationsPage', () => ({
  ConsultationsPage: () => <div data-testid="consultations-page">Consultations Page</div>
}));

vi.mock('./features/documents/DocumentsPage', () => ({
  DocumentsPage: () => <div data-testid="documents-page">Documents Page</div>
}));

vi.mock('./components/layout/Layout', () => ({
  Layout: ({ children, title }: { children: React.ReactNode; title: string }) => (
    <div data-testid="layout">
      <h1>{title}</h1>
      {children}
    </div>
  )
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(<App />);
    // Check if either login or dashboard is rendered
    await waitFor(() => {
      const layout = screen.queryByTestId('layout');
      const login = screen.queryByTestId('login-page');
      expect(layout || login).toBeInTheDocument();
    });
  });
});
