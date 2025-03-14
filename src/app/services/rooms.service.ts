import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { IMessage, IRoom } from '../entities/room';
import { ITokens } from '../entities/tokens';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  readonly api = import.meta.env.NG_APP_API;
  httpClient = inject(HttpClient);

  private tokenSubject = new BehaviorSubject<{
    status: number;
    tokens: ITokens;
  } | null>(null);

  getRooms(): Observable<{ rooms: IRoom[]; status: string }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.get<{ rooms: IRoom[]; status: string }>(
          this.api + 'access/rooms',
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }

  getRoomsByName(name: string): Observable<{ rooms: IRoom[]; status: string }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.get<{ rooms: IRoom[]; status: string }>(
          this.api + `access/rooms/${name}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }

  getMessages(
    id: number,
    limit = -1,
    offset = -1,
  ): Observable<{ messages: IMessage[]; status: string }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.get<{ messages: IMessage[]; status: string }>(
          this.api +
            `access/rooms/${id}/messages?limit=${limit}&offset=${offset}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }

  createRoom(data: FormData): Observable<{ room: IRoom; status: string }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.post<{ room: IRoom; status: string }>(
          this.api + 'access/rooms',
          data,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }),
    );
  }

  connect(
    password?: string,
  ): Observable<{ count: number; room: IRoom; status: string }> {
    return this.tokenSubject.pipe(
      take(1),
      switchMap((token) => {
        return this.httpClient.post<{
          count: number;
          room: IRoom;
          status: string;
        }>(
          this.api + 'access/rooms',
          { password: password },
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
