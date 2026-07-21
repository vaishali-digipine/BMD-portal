import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Slot } from './slots.type';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SlotApi {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/slots`;

  availableDates(officeDepartmentId: string) {
    return this.http.get<Slot.Apis.DateResponse>(
      `${this.path}/available?officeDepartmentId=${officeDepartmentId}`,
      {},
    );
  }

  availableTime(officeDepartmentId: string, slotDate: string) {
    return this.http.get<Slot.Apis.TimeResponse>(
      `${this.path}/available?officeDepartmentId=${officeDepartmentId}&slotDate=${slotDate}`,
    );
  }
}
