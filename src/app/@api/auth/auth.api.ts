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
    return this.http.post<Auth.Apis.LoginResponse>(`${this.path}/auth/login`, payload);
  }

  userList(page: number, limit: number, search: string) {
    return this.http.get<Auth.Apis.UserListResponse>(
      `${this.path}/users?paginate=true&page=${page}&limit=${limit}&search=${search}`,
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
    return this.http.post<Auth.Apis.ForgotPasswordResponse>(
      `${this.path}/auth/forgot-password`,
      payload,
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
    return this.http.post<Auth.Apis.RegisterResponse>(`${this.path}/auth/register`, payload);
  }

  registerClerk(payload: FormData) {
    return this.http.post<Auth.Apis.ClerkRegisterResponse>(`${this.path}/clerks`, payload);
  }

  clerkList(page: number, limit: number, search: string) {
    return this.http.get<Auth.Apis.ClerkListResponse>(
      `${this.path}/clerks?paginate=true&page=${page}&limit=${limit}&search=${search}&sortBy=employeeId&sortOrder=asc`,
    );
  }

  deleteClerk(id: string) {
    return this.http.delete(`${this.path}/clerks/${id}`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.path}/users/${id}`);
  }

  profile() {
    return this.http.get<Auth.Apis.ProfileResponse>(`${this.path}/auth/profile`);
  }

  logout() {
    return this.http.post<Auth.Apis.LogoutResponse>(`${this.path}/auth/logout`, {});
  }
}
