export interface ModalAction {
  title?: string;
  description?: string;
  open: boolean;
  isLink?: boolean;
  onClose: () => void;
  handleClick?: VoidFunction;
}
