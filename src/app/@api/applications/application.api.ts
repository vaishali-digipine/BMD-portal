import { inject, Injectable } from '@angular/core';
import { Application } from './applications.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../@common/types/ApiLayer.types';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApi {
  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/applications`;

  list(page: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Application.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}&sortBy=createdAt&sortOrder=desc`,
      { headers },
    );
  }

  getById(id: Application.Id) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Application.Apis.GetResponse>(`${this.path}/${id}`, { headers });
  }

  create(payload: Application.Apis.Create) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Application.Apis.CreateResponse>(this.path, payload, { headers });
  }

  update(id: string, payload: Application.Apis.Update) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<Application.Apis.UpdateResponse>(`${this.path}/${id}`, payload, {
      headers,
    });
  }
}
