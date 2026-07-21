import { inject, Injectable } from '@angular/core';
import { DeathService } from './deathService.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeathserviceApi {
  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/deaths`;

  create(payload: FormData) {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<DeathService.Apis.CreateResponse>(this.path, payload, { headers });
  }
}
