import {
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { User } from './user.model';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

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

export interface FormControlHook<T extends FieldValues> {
  register: UseFormRegister<T>;
  formState: FormState<T>;
  handleSubmit: UseFormHandleSubmit<T, T>;
  watch: UseFormWatch<T>;
}
export interface MenuModel {
  [key: string]: MenuListModel[];
}

export interface MenuListModel {
  id: number;
  name: string;
  Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & {
    muiName: string;
  };
}
