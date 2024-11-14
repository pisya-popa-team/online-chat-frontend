import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { IUser } from '../models/user';
import { ITokens } from '../models/tokens';

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
