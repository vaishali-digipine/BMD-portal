interface TPagination {
  totalDepartments: number;
  totalOffices: number;
  totalDistricts: number;
  totalStates: number;
  totalRecords: number;
  page: number;
  limit: number;
  total: number;
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
