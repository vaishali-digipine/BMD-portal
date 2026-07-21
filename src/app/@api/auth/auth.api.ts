import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from './auth.type';
import { environment } from '../../@common/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private http = inject(HttpClient);

  private path = environment.apiUrl;

  login(payload: Auth.Apis.LoginPayload) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Auth.Apis.LoginResponse>(`${this.path}/auth/login`, payload, { headers });
  }

  userList(page: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Auth.Apis.UserListResponse>(
      `${this.path}/users?paginate=true&page=${page}&limit=${limit}&search=${search}`,
      { headers },
    );
  }

  requestOtp(payload: Auth.Apis.RequestOtpPayload) {
    return this.http.post<Auth.Apis.RequestOtpResponse>(
      `${this.path}/auth/request-aadhar-otp`,
      payload,
    );
  }

  verifyOtp(payload: Auth.Apis.VerifyOtpPayload) {
    return this.http.post<Auth.Apis.VerifyOtpResponse>(
      `${this.path}/auth/verify-aadhar-otp`,
      payload,
    );
  }

  verifyForgotPassword(payload: Auth.Apis.VerifyForgotPasswordPayload) {
    return this.http.post<Auth.Apis.VerifyForgotPasswordResponse>(
      `${this.path}/auth/verify-forgot-password`,
      payload,
    );
  }

  forgotPassword(payload: Auth.Apis.ForgotPasswordPayload) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Auth.Apis.ForgotPasswordResponse>(
      `${this.path}/auth/forgot-password`,
      payload,
      { headers },
    );
  }

  resetPassword(payload: Auth.Apis.ResetPasswordPayload) {
    return this.http.post<Auth.Apis.ResetPasswordResponse>(
      `${this.path}/auth/reset-password`,
      payload,
    );
  }

  aadharDetail(payload: Auth.Apis.AadharDetailPaylod) {
    return this.http.post<Auth.Apis.AadharDetailResponse>(
      `${this.path}/auth/fetch-aadhar-details`,
      payload,
    );
  }

  register(payload: Auth.Apis.RegisterPayload) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Auth.Apis.RegisterResponse>(`${this.path}/auth/register`, payload, {
      headers,
    });
  }

  registerClerk(payload: FormData) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Auth.Apis.ClerkRegisterResponse>(`${this.path}/clerks`, payload, {
      headers,
    });
  }

  clerkList(page: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Auth.Apis.ClerkListResponse>(
      `${this.path}/clerks?paginate=true&page=${page}&limit=${limit}&search=${search}&sortBy=employeeId&sortOrder=asc`,
      { headers },
    );
  }

  deleteClerk(id: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.path}/clerks/${id}`, { headers });
  }

  deleteUser(id: string) {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.path}/users/${id}`, { headers });
  }

  profile() {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Auth.Apis.ProfileResponse>(`${this.path}/auth/profile`, { headers });
  }

  logout() {
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Auth.Apis.LogoutResponse>(`${this.path}/auth/logout`, {}, { headers });
  }
}
