import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../@common/environments/environment';
import { Clerk } from './clerk.type';

@Injectable({
  providedIn: 'root',
})
export class ClerkApi {
  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/clerks`;

  setPassword(payload: Clerk.Apis.setPasswordPayload) {
    return this.http.post<Clerk.Apis.setPasswordResponse>(`${this.path}/set-password`, payload);
  }
}
