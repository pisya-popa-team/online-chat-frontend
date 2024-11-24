import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgIf],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  @Input() roomId: string = '';
  @Input() roomLock: boolean = false;
  @Input() roomPin: boolean = false;

  @Input() lastMessage = {
    content: '',
    sender: '',
  };

  @Input() unreadMessagesCount: number = 0;

  getUnreadMessagesCount(): string {
    if (this.unreadMessagesCount < 10)
      return this.unreadMessagesCount.toString();

    return '9+';
  }
}
