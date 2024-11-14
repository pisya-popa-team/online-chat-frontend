import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokens } from '../models/tokens';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

  refreshToken(): Observable<{ status: number; tokens: ITokens }> {
    return this.httpClient.post<{ status: number; tokens: ITokens }>(
      this.api + 'refresh',
      {
        refresh_token: localStorage.getItem('refreshToken'),
      },
    );
  }
}
