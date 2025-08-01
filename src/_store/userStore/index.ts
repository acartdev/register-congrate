import { User } from '@/model/user.model';
import { create } from 'zustand';

interface States {
  user: User | null;
}
interface Actions {
  setUser: (user: User | null) => void;
}
export const useUserStore = create<States & Actions>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
