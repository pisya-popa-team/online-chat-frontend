import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private readonly socketURL = import.meta.env.NG_APP_WEBSOCKET_API;

  constructor() {
    this.socket$ = webSocket(this.socketURL);

    this.socket$.subscribe({
      next: (message) => {
        this.addMessage(this.generateMessageInFormat(message));
      },
      error: (error) => console.error('WebSocket error', error),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(this.socketURL);
    }
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  sendMessage(message: any): void {
    const msg = {
      ID: Date.now(),
      MessageType: 'user',
      Content: message.content,
      SentAt: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      RoomID: 1,
      UserID: 4,
    };

    this.socket$.next(msg);
    this.addMessage(msg);
  }

  close(): void {
    this.socket$?.complete();
  }

  //заглушка TODO: получать всю информацию с сервера
  generateMessageInFormat(message: any): IMessage {
    return {
      ID: Date.now(),
      MessageType: 'user',
      Content: message.content,
      SentAt: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      RoomID: 1,
      UserID: 1,
    };
  }

  private addMessage(message: IMessage) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
}
