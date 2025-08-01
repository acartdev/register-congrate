import { User } from '@/model/user.model';
import { create } from 'zustand';

interface States {
  user: User | null;
  isLoading: boolean;
}
interface Actions {
  setUser: (user: User | null) => void;
}
export const useUserStore = create<States & Actions>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set(() => ({ user, isLoading: false })),
}));
