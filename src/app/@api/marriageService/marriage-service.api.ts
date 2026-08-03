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
    return this.http.post<MarriageService.Apis.CreateResponse>(this.path, payload);
  }

  getById(id: string) {
    return this.http.get<MarriageService.Apis.GetByIdResponse>(`${this.path}/${id}`, {});
  }

  update(id: string, payload: MarriageService.Apis.UpdatePayload) {
    return this.http.patch<MarriageService.Apis.UpdateResponse>(`${this.path}/${id}`, payload);
  }
}
