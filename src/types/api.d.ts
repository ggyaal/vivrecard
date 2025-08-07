export interface APIResponse<T> {
  isSuccess: boolean;
  data: T;
  timestamp: string;
}

interface PageResponse<T> {
  content: T[];
  last: number;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface APIPageResponse<T> extends APIResponse<PageResponse<T>> {}
