import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  @Input() content: string;
  @Input() dateTime: string;
  @Input() senderID: number;
  @Input() messageType: string;

  isCurrentUser(): boolean {
    let currentUser = localStorage.getItem('user');
    let currentUserID = currentUser ? JSON.parse(currentUser).ID : -1;

    return this.senderID === currentUserID;
  }

  username(): string {
    let usersJSON = localStorage.getItem('users');
    let users: IUser[] = usersJSON ? (JSON.parse(usersJSON) as IUser[]) : [];
    let user = users?.find((u) => u.ID === this.senderID);
    return user ? user.Username : '';
  }
}
