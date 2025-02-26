import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MessageComponent } from '../../shared/components/message/message.component';
import { IMessage } from '../../models/room';
import { NgForOf } from '@angular/common';
import { IUser } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MessageComponent, NgForOf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit, AfterViewInit {
  roomId = 1; //todo: получать roomID
  users: IUser[];
  usersCount = 0;
  // messages: IMessage[] = [
  //   {
  //     ID: 1,
  //     MessageType: 'user',
  //     Content: 'это сообщение от другого пользователя',
  //     SentAt: '10.11.12 13:12',
  //     RoomID: 3,
  //     UserID: 1,
  //   },
  //   {
  //     ID: 2,
  //     MessageType: 'system',
  //     Content: 'это системное сообщение',
  //     SentAt: '10.11.12 13:12',
  //     RoomID: 3,
  //     UserID: 2,
  //   },
  //   {
  //     ID: 3,
  //     MessageType: 'user',
  //     Content: 'это сообщение от текущего пользователя',
  //     SentAt: '10.11.12 13:13',
  //     RoomID: 3,
  //     UserID: 4,
  //   },
  //   {
  //     ID: 4,
  //     MessageType: 'user',
  //     Content: 'это сообщение от текущего пользователя',
  //     SentAt: '10.11.12 13:14',
  //     RoomID: 3,
  //     UserID: 4,
  //   },
  // ];
  messages: IMessage[] = [];
  readonly socketURL = import.meta.env.NG_APP_WEBSOCKET_API;
  isConnected: boolean = false;
  protected readonly AbortSignal = AbortSignal;
  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
    link: '',
    linkName: '',
  });
  state$ = this.stateSubject.asObservable();
  private socket$!: WebSocketSubject<any>;

  ngOnInit(): void {
    this.socket$ = webSocket(this.socketURL);
    this.socket$.subscribe({
      next: (message) => {
        if (message.type === 1) {
          this.messages.push(message.data);
        }

        if (!this.isConnected) {
          this.isConnected = true;
          this.sendMessage('Connected', 'system');
        }
      },
      error: (error) => {
        console.error('WebSocket error', error);
      },
      complete: () => {
        this.sendMessage('Disconnect', 'system');
        this.isConnected = false;
        console.log('WebSocket complete');
      },
    });
    // this.webSocketService.connect('');
    // this.webSocketService.sendMessage({ messageType: 0, data: 'test' });
  }

  sendMessage(message: string, type: string) {
    if (!this.isConnected) return;

    const newMessage: IMessage = {
      ID: 0,
      MessageType: type,
      Content: message,
      SentAt: new Date().toLocaleString([], {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      RoomID: this.roomId,
      UserID: 4,
    };

    this.socket$?.next(newMessage);
    this.messages.push(newMessage);
  }

  closeSocket() {
    this.socket$?.complete();
    // this.webSocketService.closeConnection();
  }

  ngAfterViewInit(): void {
    this.usersCount = 1;

    let usersCountSuffix;
    let usersCountString = this.usersCount.toString();
    let lc = usersCountString.charAt(usersCountString.length - 1);
    let plc =
      usersCountString.length > 1
        ? usersCountString.charAt(usersCountString.length - 2)
        : '';

    if (lc == '1' && plc != '1') usersCountSuffix = 'юзер';
    else if (lc == '2' && plc != '1') usersCountSuffix = 'юзера';
    else if (lc == '3' && plc != '1') usersCountSuffix = 'юзера';
    else if (lc == '4' && plc != '1') usersCountSuffix = 'юзера';
    else usersCountSuffix = 'юзеров';

    this.stateSubject.next({
      title: `Рум #${this.roomId}`,
      description: `в руме сейчас ${this.usersCount} ${usersCountSuffix}`,
      link: '/',
      linkName: '← К списку румов',
    });
  }
}
