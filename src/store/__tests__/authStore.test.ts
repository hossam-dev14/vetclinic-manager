import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle login success', async () => {
    const user = { id: 1, name: 'Test User', email: 'test@example.com', role: 'vet' as const };
    
    // We can't easily mock the internal setTimeout promise without fake timers, 
    // but for this integration test we can just await it.
    const loginPromise = useAuthStore.getState().login(user);
    
    // Check loading state immediately
    expect(useAuthStore.getState().isLoading).toBe(true);
    
    await loginPromise;
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should handle logout', async () => {
    const user = { id: 1, name: 'Test User', email: 'test@example.com', role: 'vet' as const };
    await useAuthStore.getState().login(user);
    
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error', () => {
    useAuthStore.getState().setError('Test error');
    expect(useAuthStore.getState().error).toBe('Test error');
  });
});
