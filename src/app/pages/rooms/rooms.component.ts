import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';
import { StateService } from '../../services/state.service';
import { IRoom } from '../../models/room';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent, NgForOf, NgIf],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  rooms: IRoom[];
  pinnedRooms: IRoom[];
  otherRooms: IRoom[];
  protected readonly String = String;
  private stateService = inject(StateService);

  ngOnInit(): void {
    //todo: получение комнат
    this.rooms = [
      {
        ID: 1337,
        lastMessage: {
          sender: 'username',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          date: '10.11.12 13:14',
        },
        pinned: true,
        locked: false,
      },
      {
        ID: 1345,
        lastMessage: {
          sender: 'username',
          content: 'Lorem ipsum dolor sit amet.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: true,
      },
      {
        ID: 1347,
        lastMessage: null,
        pinned: true,
        locked: true,
      },
      {
        ID: 123,
        lastMessage: {
          sender: '(You)',
          content: 'Lorem ipsum.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: false,
      },
      {
        ID: 1263,
        lastMessage: {
          sender: '(You)',
          content: 'Lorem ipsum.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: false,
      },
      {
        ID: 654,
        lastMessage: {
          sender: '(You)',
          content: 'Lorem ipsum.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: false,
      },
      {
        ID: 321,
        lastMessage: {
          sender: '(You)',
          content: 'Lorem ipsum.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: false,
      },
      {
        ID: 1323,
        lastMessage: {
          sender: '(You)',
          content: 'Lorem ipsum.',
          date: '10.11.12 13:14',
        },
        pinned: false,
        locked: false,
      },
      {
        ID: 834,
        lastMessage: null,
        pinned: false,
        locked: true,
      },
      {
        ID: 543,
        lastMessage: null,
        pinned: false,
        locked: true,
      },
      {
        ID: 1232,
        lastMessage: null,
        pinned: false,
        locked: false,
      },
    ];

    this.rooms = [];

    this.pinnedRooms = this.rooms.filter((room) => room.pinned);
    this.otherRooms = this.rooms.filter((room) => !room.pinned);

    let desc =
      this.rooms.length > 0
        ? 'тотал ' + this.rooms.length + ' румов'
        : 'создай первый рум';

    this.stateService.setState({
      title: 'Румы',
      description: desc,
    });
  }
}
