import { inject, Injectable } from '@angular/core';
import { Holiday } from './holidays.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidaysApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/holidays`;

  create(payload: Holiday.Apis.CreatePayload) {
    return this.http.post<Holiday.Apis.CreateResponse>(this.path, payload);
  }

  list(page: number, limit: number) {
    return this.http.get<Holiday.Apis.ListResponse>(`${this.path}?page=${page}&limit=${limit}`);
  }

  delete(id: Holiday.Id) {
    return this.http.delete<null>(`${this.path}/${id}`);
  }
}
