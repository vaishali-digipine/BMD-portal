import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Meetings } from './meeting.type';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MeetingApi {
  private http = inject(HttpClient);

  private path = `${environment.apiUrl}/meetings`;

  getTodayMeeting(page: number, limit: number, search: string) {
    return this.http.get<Meetings.Apis.GetTodayMeetingResponse>(
      `${this.path}/today?paginate=true&page=${page}&limit=${limit}&search=${search}`,
    );
  }
}
