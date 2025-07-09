export interface ListModel {
  id: number;
  name: string;
  description?: string;
  created_at: Date | string;
  updated_at: Date | string;
  attachment: string;
}
