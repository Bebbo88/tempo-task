export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface ApiResponse<T> {
  info: PageInfo;
  results: T[];
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}
