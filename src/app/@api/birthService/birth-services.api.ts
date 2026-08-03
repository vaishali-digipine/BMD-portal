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
    return this.http.post<BirthService.Apis.CreateResponse>(this.path, payload);
  }

  getById(id: string) {
    return this.http.get<BirthService.Apis.GetByIdResponse>(`${this.path}/${id}`, {});
  }

  update(id: string, payload: BirthService.Apis.UpdatePayload) {
    return this.http.patch<BirthService.Apis.UpdateResponse>(`${this.path}/${id}`, payload);
  }
}
