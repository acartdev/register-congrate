import { AlertColor } from '@mui/material';
import { create } from 'zustand';

interface SnackData {
  title?: string;
  description?: string;
  status: AlertColor;
}
interface States {
  isSnackOpen: boolean;
  data: SnackData;
}

// Action types
interface Actions {
  onOpenSnack: () => void;
  onCloseSnack: () => void;
  updateSnackContent: (data: SnackData) => void;
}

// useCounterStore
export const useSnackStore = create<States & Actions>((set) => ({
  isSnackOpen: false,
  data: {
    title: '',
    description: '',
    status: 'success',
  },
  onOpenSnack: () => set(() => ({ isSnackOpen: true })),
  onCloseSnack: () => set(() => ({ isSnackOpen: false })),
  updateSnackContent: (value) => set(() => ({ data: value })),
}));
