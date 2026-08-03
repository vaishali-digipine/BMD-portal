import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Office } from './offices.type';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficesApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/offices`;

  create(payload: Office.Apis.CreatePayload) {
    return this.http.post<Office.Apis.CreateResponse>(this.path, payload);
  }

  list(page: number, limit: number, search: string) {
    return this.http.get<Office.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}`,
    );
  }

  selectOffice(districtId: String) {
    return this.http.get<Office.Apis.ListResponse>(`${this.path}?districtId=${districtId}`);
  }

  delete(id: Office.Id) {
    return this.http.delete<null>(`${this.path}/${id}`);
  }
}
