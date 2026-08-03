import { inject, Injectable } from '@angular/core';
import { Application } from './applications.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationApi {
  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/applications`;

  list(page: number, limit: number, search: string) {
    return this.http.get<Application.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}&sortBy=createdAt&sortOrder=desc`,
    );
  }

  getById(id: Application.Id) {
    return this.http.get<Application.Apis.GetResponse>(`${this.path}/${id}`);
  }

  create(payload: Application.Apis.Create) {
    return this.http.post<Application.Apis.CreateResponse>(this.path, payload);
  }

  update(id: string, payload: Application.Apis.Update) {
    return this.http.patch<Application.Apis.UpdateResponse>(`${this.path}/${id}`, payload);
  }

  completeApplication(id: string, payload: Application.Apis.CompleteApplication) {
    return this.http.patch<Application.Apis.CompleteApplicationResponse>(
      `${this.path}/${id}/complete`,
      payload,
    );
  }

  getApplications(page: number, limit: number, search: string, status: string) {
    return this.http.get<Application.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}&status=${status}&sortBy=createdAt&sortOrder=desc`,
    );
  }

  resumeApplication(applicationId: string) {
    return this.http.get<Application.Apis.GetResponse>(`${this.path}/${applicationId}/resume`);
  }
}
