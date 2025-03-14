import { Component, inject, Input, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit {
  @Input() content: string;
  @Input() sentAt: string;
  @Input() senderID: number;
  @Input() messageType: string;

  @Input() isCurrentUser: boolean;

  senderUsername: string = '';
  usersService = inject(UsersService);

  ngOnInit(): void {
    this.usersService.getUserByID(this.senderID).subscribe((response) => {
      this.senderUsername = response.user.Username;
    });
  }
}
