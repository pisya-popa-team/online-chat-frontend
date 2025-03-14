import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITokens } from '../entities/tokens';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

  refreshToken(): Observable<{ status: string; tokens: ITokens }> {
    return this.httpClient.post<{ status: string; tokens: ITokens }>(
      this.api + 'refresh/tokens',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('refreshToken'),
        },
      },
    );
  }
}
