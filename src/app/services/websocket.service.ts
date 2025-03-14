import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from '../entities/message';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public currentRoomID: number = -1;
  private socket$!: WebSocketSubject<any>;
  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  messages$ = this.messagesSubject.asObservable();
  private readonly socketURL = import.meta.env.NG_APP_WEBSOCKET_API;

  connect(roomID: number) {
    let token = localStorage.getItem('accessToken');
    this.socket$ = webSocket(
      `${this.socketURL}/rooms/${roomID}/?token=${token}`,
    );

    this.socket$.subscribe({
      next: (message: IMessage) => {
        this.addMessage(message);
      },
      error: (error) => console.error('WebSocket error', error),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  sendMessage(message: IMessage): void {
    this.socket$.next(message);
  }

  close(): void {
    this.socket$?.complete();
  }

  public addMessage(message: IMessage) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }
}
