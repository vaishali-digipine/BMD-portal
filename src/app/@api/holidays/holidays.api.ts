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
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Holiday.Apis.CreateResponse>(this.path, payload, { headers });
  }

  list(page: number, limit: number) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Holiday.Apis.ListResponse>(`${this.path}?page=${page}&limit=${limit}`, {
      headers,
    });
  }

  delete(id: Holiday.Id) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<null>(`${this.path}/${id}`, { headers });
  }
}
