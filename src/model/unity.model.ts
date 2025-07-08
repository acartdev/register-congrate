import { User } from './user.model';

export interface ModalAction {
  title?: string;
  description?: string;
  open: boolean;
  isLink?: boolean;
  onClose: () => void;
  handleClick?: VoidFunction;
}

export interface FormAction {
  isReadOnly: boolean;
  data?: User;
}
