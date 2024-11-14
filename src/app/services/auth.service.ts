import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

  register(data: FormData): Observable<{
    status: string;
    tokens: { access_token: string; refresh_token: string };
  }> {
    return this.httpClient.post<{
      status: string;
      tokens: { access_token: string; refresh_token: string };
    }>(this.api + 'reg', data);
  }
}
