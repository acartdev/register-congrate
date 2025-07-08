import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { User } from './user.model';

export interface ModalAction {
  title?: string;
  description?: string;
  open: boolean;
  isLink?: boolean;
  onClose: () => void;
  handleClick?: VoidFunction;
}

export interface FormAction<T extends FieldValues> {
  isReadOnly: boolean;
  data?: User;
  formControl: {
    register: UseFormRegister<T>;
    formState: FormState<T>;
    handleSubmit: UseFormHandleSubmit<T, T>;
    watch: UseFormWatch<T>;
  };
}
