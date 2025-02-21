import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  readonly socketURL = import.meta.env.NG_APP_WEBSOCKET_API;
  private socket$!: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket(this.socketURL);

    this.socket$.subscribe({
      next: (msg) => console.log(msg),
      error: (err) => console.error(err),
      complete: () => console.log('Socket connection closed'),
    });
  }

  sendMessage(message: any) {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
