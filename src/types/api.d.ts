export interface APIResponse<T> {
  isSuccess: boolean;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  last: boolean;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface APIPageResponse<T> extends APIResponse<PageResponse<T>> {}
