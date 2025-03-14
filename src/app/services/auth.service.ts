import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokens } from '../entities/tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);
  router = inject(Router);

  register(data: FormData): Observable<{
    status: string;
    tokens: ITokens;
  }> {
    return this.httpClient.post<{ status: string; tokens: ITokens }>(
      this.api + 'reg',
      data,
    );
  }

  auth(data: FormData): Observable<{
    status: string;
    tokens: { access_token: string; refresh_token: string };
  }> {
    return this.httpClient.post<{
      status: string;
      tokens: { access_token: string; refresh_token: string };
    }>(this.api + 'auth', data);
  }

  recoveryEmail(
    data: FormData,
  ): Observable<{ message: string; status: string }> {
    return this.httpClient.post<{ message: string; status: string }>(
      this.api + 'recovery',
      data,
    );
  }

  recoveryPassword(
    data: FormData,
  ): Observable<{ message: string; status: string }> {
    return this.httpClient.patch<{ message: string; status: string }>(
      this.api + 'recovery',
      data,
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('pinnedIDs');
    this.router.navigate(['/auth']);
  }
}
