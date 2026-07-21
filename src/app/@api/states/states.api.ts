import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { State } from './states.type';
import { Observable } from 'rxjs';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatesApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/states`;

  create(payload: State.Apis.CreatePayload): Observable<State.Apis.CreateResponse> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<State.Apis.CreateResponse>(this.path, payload, { headers });
  }

  list(page: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<State.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}`,
      { headers },
    );
  }

  selectState() {
    return this.http.get<State.Apis.ListResponse>(this.path);
  }

  delete(id: State.Id) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.path}/${id}`, { headers });
  }
}
