interface TPagination {
  page: number;
  limit: number;
  totalPage: number;
  totalDocuments: number;
}
export namespace Response {
  export interface Normal<T> {
    error: boolean;
    message: string;
    data: T;
  }

  export interface Paginated<T> {
    message: string;
    data: T[];
    pagination: TPagination;
  }
}
