import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  readonly socketURL = import.meta.env.NG_APP_WEBSOCKET_API;
  private socket$!: WebSocketSubject<any>;

  connect(url: string) {
    console.log('Connecting to ' + this.socketURL + url);
    this.socket$ = webSocket(this.socketURL + url);
    this.socket$?.next('Connected');
  }

  sendMessage(message: { messageType: number; data: string }) {
    if (this.socket$) {
      this.socket$?.next(message);
    }
  }

  closeConnection() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
