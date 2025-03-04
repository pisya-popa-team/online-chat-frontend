import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MessageComponent } from '../../shared/components/message/message.component';
import { IMessage } from '../../models/room';
import { NgForOf } from '@angular/common';
import { IUser } from '../../models/user';
import { BehaviorSubject } from 'rxjs';
import { WebsocketService } from '../../services/websocket.service';
import endingByNum from '../../heplers/endingByNum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MessageComponent, NgForOf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit, AfterViewInit {
  roomId: number;
  users: IUser[] = [];
  usersCount = 0;
  messages: IMessage[] = [];
  socketService = inject(WebsocketService);
  route = inject(ActivatedRoute);
  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
    link: '',
    linkName: '',
  });
  state$ = this.stateSubject.asObservable();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roomId = Number(params.get('id'));
    });

    this.socketService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  closeSocket() {
    this.socketService.close();
  }

  ngAfterViewInit(): void {
    this.usersCount = 1; //TODO: получать количество юзеров с сервера

    let usersCountSuffix = endingByNum(this.usersCount, [
      'юзер',
      'юзера',
      'юзеров',
    ]);

    this.stateSubject.next({
      title: `Рум #${this.roomId}`,
      description: `в руме сейчас ${this.usersCount} ${usersCountSuffix}`,
      link: '/',
      linkName: '← К списку румов',
    });
  }
}
