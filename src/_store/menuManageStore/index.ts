import { User } from '@/model/user.model';
import { create } from 'zustand';

interface States {
  anchorEl: HTMLButtonElement | undefined;
  isOpen: boolean;
  user: User | undefined;
}

// Action types
interface Actions {
  handleClose: () => void;
  updateSelected: (data: User) => void;
  updateAnchorEl: (anchorEl: HTMLButtonElement | undefined) => void;
}

// useCounterStore
export const useMenuStore = create<States & Actions>((set) => ({
  anchorEl: undefined,
  isOpen: false,
  user: undefined,

  handleClose: () =>
    set(() => ({ isOpen: false, anchorEl: undefined, user: undefined })),
  updateAnchorEl: (anchor) =>
    set(() => ({ anchorEl: anchor, isOpen: Boolean(anchor) })),
  updateSelected: (user) => set(() => ({ user: user })),
}));
