import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

interface AuthState {
  username: string;
  email: string;
  role: string;
  tokenExpiry: number | null;
}

export const authAtom = atom<AuthState>({
  key: 'authState',
  default: {
    username: '',
    email: '',
    role: '',
    tokenExpiry: null,
  },
  effects_UNSTABLE: [persistAtom],
});
