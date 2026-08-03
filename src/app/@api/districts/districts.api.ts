import { inject, Injectable } from '@angular/core';
import { District } from './districts.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DistrictsApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/districts`;

  create(payload: District.Apis.CreatePayload) {
    return this.http.post<District.Apis.CreateResponse>(this.path, payload);
  }

  list(page: number, limit: number, search: string) {
    return this.http.get<District.Apis.ListResponse>(
      `${this.path}?page=${page}&limit=${limit}&search=${search}`,
    );
  }

  selectDistrict(stateId: string) {
    return this.http.get<District.Apis.ListResponse>(`${this.path}?stateId=${stateId}`);
  }

  formDistrict() {
    return this.http.get<District.Apis.ListResponse>(
      `${this.path}?stateId=6a2ff44a4a7bb1ec6b45d661`,
    );
  }

  delete(id: District.Id) {
    return this.http.delete<null>(`${this.path}/${id}`);
  }
}
