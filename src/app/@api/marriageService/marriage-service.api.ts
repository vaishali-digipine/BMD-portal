import { inject, Injectable } from '@angular/core';
import { MarriageService } from './marriageService.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarriageServiceApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/marriages`;

  create(payload: FormData) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<MarriageService.Apis.CreateResponse>(this.path, payload, { headers });
  }

  getById(id: string) {
    return this.http.get<MarriageService.Base>(`${this.path}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
