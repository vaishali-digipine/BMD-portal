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
    return this.http.post<DeathService.Apis.CreateResponse>(this.path, payload);
  }

  getById(id: string) {
    return this.http.get<DeathService.Apis.GetByIdResponse>(`${this.path}/${id}`, {});
  }

  update(id: string, payload: DeathService.Apis.Update) {
    return this.http.patch<DeathService.Apis.UpdateResponse>(`${this.path}/${id}`, payload);
  }
}
