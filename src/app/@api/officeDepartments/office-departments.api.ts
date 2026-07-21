import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OfficeDepartment } from './officeDepartments.type';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfficeDepartmentsApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/office-departments`;

  getOfficeDepartment(officeId: string, departmentId: string) {
    return this.http.get<OfficeDepartment.Apis.GetByIdResponse>(
      `${this.path}?officeId=${officeId}&departmentId=${departmentId}`,
    );
  }
}
