export interface HttpResponse<T> {
  status: number;
  data?: T;
  message?: string;
  error?: string;
}
