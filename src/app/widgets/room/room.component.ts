import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { IMessage } from '../../entities/message';
import { Router } from '@angular/router';
import { DarkButtonComponent } from '../../shared/components/dark-button/dark-button.component';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgIf, DarkButtonComponent, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  @Output() roomPinToggled = new EventEmitter<void>();
  @Input() roomID: number;
  @Input() roomName: string = '';
  @Input() roomType: string = 'public';
  @Input() roomPin: boolean = false;
  @Input() lastMessage?: IMessage | null;
  @Input() unreadMessagesCount: number = 0;

  lastMessageSender: string;

  router = inject(Router);
  hovering: boolean = false;
  roomsService = inject(RoomsService);
  toastService = inject(ToastrService);
  isConnecting: boolean = false;
  roomPassword: string;

  getUnreadMessagesCount(): string {
    if (this.unreadMessagesCount < 10)
      return this.unreadMessagesCount.toString();

    return '9+';
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

  joinRoom() {
    if (this.roomType === 'private') {
      this.isConnecting = true;
      return;
    }
    this.roomsService.join().subscribe({
      next: () => {
        this.isConnecting = false;
        this.router.navigate(['/room/' + this.roomID]);
      },
      error: (error) => {
        this.isConnecting = false;
        console.error(error);
      },
    });
  }

  joinPrivateRoom() {
    if (!this.isConnecting) return;

    if (!this.roomPassword) {
      this.toastService.error('Пароль не может быть пустым', 'Ошибка');
      return;
    }

    this.roomsService.join(this.roomPassword).subscribe({
      next: () => {
        this.isConnecting = false;
        this.router.navigate(['/room/' + this.roomID]);
      },
      error: (error) => {
        this.isConnecting = false;
        this.toastService.error('Неправильный пароль', 'Ошибка');
        console.error(error);
      },
    });
  }

  getUsername() {
    let userJSON = localStorage.getItem('user');
    let userID = userJSON ? JSON.parse(userJSON).ID : '.';

    if (this.lastMessage) {
      return this.lastMessage.user_id === userID
        ? '(You)'
        : this.lastMessageSender;
    }

    return '';
  }
}
