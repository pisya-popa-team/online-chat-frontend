import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { IMessage } from '../../../models/room';
import { UsersService } from '../../../services/users.service';
import { IUser } from '../../../models/user';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgIf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  @Input() roomName: string = '';
  @Input() roomType: string = 'public';
  @Input() roomPin: boolean = false;

  @Input() lastMessage: IMessage | null;

  @Input() unreadMessagesCount: number = 0;
  users: IUser[];
  private usersService = inject(UsersService);

  getUnreadMessagesCount(): string {
    if (this.unreadMessagesCount < 10)
      return this.unreadMessagesCount.toString();

    return '9+';
  }

  getUsername(id: number): string {
    let user = this.users?.find((u) => u.ID === id);
    return user ? user.Username : '';
  }

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.users;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
