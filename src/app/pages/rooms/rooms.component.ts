import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../widgets/room/room.component';
import { IRoom } from '../../entities/room';
import { IMessage } from '../../entities/message';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DarkButtonComponent } from '../../shared/components/dark-button/dark-button.component';
import { BehaviorSubject, debounceTime, find, Subject } from 'rxjs';
import { RoomsService } from '../../services/rooms.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent, NgForOf, NgIf, FormsModule, DarkButtonComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  rooms: IRoom[] = [];
  messages: (IMessage | any)[] = [];
  sortedRooms: { pinned: IRoom[]; other: IRoom[] };
  createToggle: boolean = false;
  isCreating: boolean = false;
  createType: 'public' | 'private' | null = null;
  newRoomPassword = '';
  protected readonly String = String;
  protected readonly find = find;
  private roomsService = inject(RoomsService);
  private toastrService = inject(ToastrService);
  private usersService = inject(UsersService);
  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
  });
  state$ = this.stateSubject.asObservable();
  private searchSubject = new Subject<string>();

  toggleCreate(value: boolean) {
    this.createToggle = value;
    if (!value) this.isCreating = value;
  }

  createRoom(type: 'public' | 'private' = 'private') {
    this.createType = type;
    if (type === 'private' && !this.isCreating) {
      this.isCreating = true;
      return;
    }
    if (type === 'private' && this.newRoomPassword.length < 1) {
      this.toastrService.error('Пароль не может быть пустым', 'Ошибка');
      return;
    }

    let formData = new FormData();
    if (this.newRoomPassword) {
      formData.append('password', this.newRoomPassword);
    }

    this.roomsService.createRoom(formData).subscribe({
      next: (response) => {
        this.toggleCreate(false);
        this.refreshRooms();
      },
      error: (error) => {
        this.toggleCreate(false);
        console.error(error);
      },
    });
    this.newRoomPassword = '';
  }

  refreshRooms() {
    this.usersService.getCurrentUser().subscribe((response) => {
      this.rooms = response.user.Rooms;
      this.messages = new Array(this.rooms.length);
      this.getMessages();

      let pinnedIDs: number[] = [];
      let pinnedIDsString = localStorage.getItem('pinnedIDs');
      if (pinnedIDsString) {
        pinnedIDs = JSON.parse(pinnedIDsString);
      }
      this.sortedRooms = this.rooms.reduce(
        (acc, room) => {
          if (pinnedIDs.includes(room.ID)) acc.pinned.push(room);
          else acc.other.push(room);
          return acc;
        },
        {
          pinned: [],
          other: [],
        } as { pinned: IRoom[]; other: IRoom[] },
      );

      let desc =
        this.rooms.length > 0
          ? 'тотал ' + this.rooms.length + ' румов'
          : 'создай первый рум';

      this.stateSubject.next({
        title: 'Румы',
        description: desc,
      });
    });
  }

  searchRooms(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim();

    if (searchValue.length > 0) this.searchSubject.next(searchValue);
    else this.refreshRooms();
  }

  performSearch(searchValue: string) {
    this.roomsService.getRoomsByName(searchValue).subscribe({
      next: (response) => {
        this.sortedRooms.pinned = [];
        this.sortedRooms.other = response.rooms;
        this.getMessages();
      },
      error: (error) => {
        console.error('Ошибка при поиске комнат:', error);
      },
    });
  }

  getMessages() {
    for (let i = 0; i < this.rooms.length; i++) {
      this.messages[i] = null;
      this.roomsService
        .getMessages(this.rooms[i].ID, 1)
        .subscribe((response) => {
          this.messages[i] = response.messages?.[0];
        });
    }
  }

  getLastMessage(roomID: number): IMessage | null {
    return this.messages.find((message) => message?.room_id === roomID);
  }

  ngOnInit(): void {
    this.refreshRooms();

    this.searchSubject.pipe(debounceTime(500)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }
}
