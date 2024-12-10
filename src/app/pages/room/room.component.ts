import { Component, inject, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { MessageComponent } from '../../shared/components/message/message.component';
import { IMessage } from '../../models/room';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MessageComponent, NgForOf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  roomId = '';
  usersCount = 0;
  messages: IMessage[] = [
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Система определила вашу ориентацию за вас. Вы - антихайп.',
      sender: 'system',
      date: '10.11.12 13:14',
    },
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Gbcz gjgf',
      sender: 'username1',
      date: '10.11.12 13:14',
    },
    {
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sender: 'username2',
      date: '10.11.12 13:14',
    },
    {
      content: 'Пользователь username был кикнут из рума',
      sender: 'system',
      date: '10.11.12 13:14',
    },
  ];
  senders = [
    'message',
    'message',
    'system',
    'user',
    'user',
    'message',
    'message',
    'user',
    'user',
    'message',
    'message',
    'user',
    'user',
    'system',
  ];
  protected readonly AbortSignal = AbortSignal;
  private stateService = inject(StateService);

  ngOnInit(): void {
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

    this.stateService.setState({
      title: `Рум #${this.roomId}`,
      description: `в руме сейчас ${this.usersCount} ${usersCountSuffix}`,
      linkName: '← К списку румов',
      link: '/',
    });
  }
}
