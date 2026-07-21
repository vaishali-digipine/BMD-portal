import { inject, Injectable } from '@angular/core';
import { BirthService } from './birthServices.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BirthServicesApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/births`;

  create(payload: FormData) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<BirthService.Apis.CreateResponse>(this.path, payload, { headers });
  }

  getById(id: string) {
    return this.http.get<BirthService.Base>(`${this.path}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
