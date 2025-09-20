import type { AuthState } from '../store/slices/authSlice';

// This type represents the shape of our root state
export interface RootState {
  _persist: {
    version: number;
    rehydrated: boolean;
  };
  auth: AuthState;
}
