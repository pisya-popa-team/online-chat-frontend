import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { IMessage } from '../../../models/room';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgIf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  @Output() roomPinToggled = new EventEmitter<void>();
  @Input() roomID: number;
  @Input() roomName: string = '';
  @Input() roomType: string = 'public';
  @Input() roomPin: boolean = false;

  @Input() lastMessage: IMessage | null;

  @Input() unreadMessagesCount: number = 0;

  hovering: boolean = false;
  users: IUser[];

  getUnreadMessagesCount(): string {
    if (this.unreadMessagesCount < 10)
      return this.unreadMessagesCount.toString();

    return '9+';
  }

  getUsername(id: number): string {
    let user = this.users?.find((u) => u.ID === id);
    return user ? user.Username : '';
  }

  togglePinRoom() {
    let pinnedIDs: number[] = [];
    let pinnedIDsString = localStorage.getItem('pinnedIDs');
    if (pinnedIDsString) {
      pinnedIDs = JSON.parse(pinnedIDsString);
    }
    if (pinnedIDs.includes(this.roomID)) {
      pinnedIDs = pinnedIDs.filter((id) => id !== this.roomID);
    } else {
      pinnedIDs.push(this.roomID);
    }

    localStorage.setItem('pinnedIDs', JSON.stringify(pinnedIDs));

    this.roomPinToggled.emit();
  }

  ngOnInit(): void {
    let usersJSON = localStorage.getItem('users')
      ? localStorage.getItem('users')
      : '';
    this.users = usersJSON
      ? (JSON.parse(usersJSON) as IUser[]).filter((user) =>
          user?.Room?.find((room) => room?.ID === this.roomID),
        )
      : [];
  }
}
