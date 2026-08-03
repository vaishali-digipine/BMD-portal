import { inject, Injectable } from '@angular/core';
import { Department } from './departments.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/departments`;

  create(payload: Department.Apis.CreatePayload) {
    return this.http.post<Department.Apis.CreateResponse>(this.path, payload);
  }

  list(page: number, limit: number, search: string) {
    return this.http.get<Department.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}`,
    );
  }

  selectDepartment() {
    return this.http.get<Department.Apis.ListResponse>(this.path);
  }

  getDepartment(search: 'birth' | 'marriage' | 'death') {
    return this.http.get<Department.Apis.ListResponse>(`${this.path}?search=${search}`);
  }

  delete(id: Department.Id) {
    return this.http.delete<null>(`${this.path}/${id}`);
  }
}
