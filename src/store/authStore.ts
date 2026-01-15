import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => Promise<void>;
  logout: () => void;
  setError: (message: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (user) => {
    set({ isLoading: true, error: null });

    // Simulate async login to align with future real backend integration
    await new Promise((resolve) => setTimeout(resolve, 400));

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  },
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    }),
  setError: (message) => set({ error: message }),
}));

export const useAuthActions = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setError = useAuthStore((state) => state.setError);

  return { login, logout, setError };
};

export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
