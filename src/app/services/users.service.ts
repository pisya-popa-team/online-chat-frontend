import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { IUser } from '../models/user';
import { ITokens } from '../models/tokens';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

  private tokenSubject = new BehaviorSubject<{
    status: number;
    tokens: ITokens;
  } | null>(null);

  constructor(apiService: ApiService) {
    apiService.refreshToken().subscribe({
      next: (tokens) => {
        localStorage.setItem('accessToken', tokens.tokens.access_token);
        localStorage.setItem('refreshToken', tokens.tokens.refresh_token);
        this.tokenSubject.next(tokens);
      },
      error: (error) => {
        console.error('Error refreshing token', error);
        this.tokenSubject.next(null);
      },
    });
  }

  getCurrentUser(): Observable<{ status: string; user: IUser }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.get<{ status: string; user: IUser }>(
          this.api + 'access/users/me',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }

  getUser(id: number): Observable<{ status: string; user: IUser }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.get<{ status: string; user: IUser }>(
          this.api + 'access/users/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }
}
