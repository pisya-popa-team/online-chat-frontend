import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokens } from '../models/tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
