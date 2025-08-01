import {
  FieldValues,
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { AlertColor, SvgIconTypeMap } from '@mui/material';
import { User } from './user.model';

export interface ModalAction {
  title?: string;
  user?: User;
  description?: string;
  open: boolean;
  status?: AlertColor;
  isLink?: boolean;
  onClose: () => void;
  handleClick?: VoidFunction;
}

export interface FormAction<T extends FieldValues> {
  isReadOnly: boolean;
  formControl: {
    register: UseFormRegister<T>;
    formState: FormState<T>;
    handleSubmit: UseFormHandleSubmit<T, T>;
    watch: UseFormWatch<T>;
    getValues: UseFormGetValues<T>;
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
  path: string;
}
export interface MenuManageProps {
  anchorEl: HTMLButtonElement | undefined;
  open: boolean;
  user: User | undefined;
  handleClose: () => void;
}
