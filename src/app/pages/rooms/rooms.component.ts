import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';
import { IMessage, IRoom } from '../../models/room';
import { NgForOf, NgIf } from '@angular/common';
import { RoomsService } from '../../services/rooms.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DarkButtonComponent } from '../../shared/components/dark-button/dark-button.component';
import { BehaviorSubject } from 'rxjs';
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
  messages: IMessage[][];
  pinnedRooms: IRoom[];
  otherRooms: IRoom[];
  createToggle: boolean = false;
  isCreating: boolean = false;
  createType: 'public' | 'private' | null = null;
  newRoomPassword = '';
  protected readonly String = String;
  private roomsService = inject(RoomsService);
  private toastrService = inject(ToastrService);
  private usersService = inject(UsersService);

  private stateSubject = new BehaviorSubject({
    title: '',
    description: '',
  });
  state$ = this.stateSubject.asObservable();

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
    this.rooms = [];

    this.usersService.getCurrentUser().subscribe((response) => {
      this.rooms = response.user.Rooms;

      this.messages = new Array(this.rooms.length);

      for (let i = 0; i < this.rooms.length; i++) {
        this.messages[i] = [];
        this.roomsService
          .getMessages(this.rooms[i].ID)
          .subscribe((response) => {
            this.messages[i] = response.messages;
          });
      }

      let desc =
        this.rooms.length > 0
          ? 'тотал ' + this.rooms.length + ' румов'
          : 'создай первый рум';

      this.stateService.setState({
        title: 'Румы',
        description: desc,
      });

      let pinnedIDs: number[] = [];
      let pinnedIDsString = localStorage.getItem('pinnedIDs');
      if (pinnedIDsString) {
        pinnedIDs = JSON.parse(pinnedIDsString);
      }
      this.pinnedRooms = this.rooms.filter((room) =>
        pinnedIDs.includes(room.ID),
      );
      this.otherRooms = this.rooms.filter(
        (room) => !pinnedIDs.includes(room.ID),
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

    if (searchValue.length > 0) {
      this.roomsService.getRoomsByName(searchValue).subscribe({
        next: (response) => {
          this.rooms = response.rooms;

          let pinnedIDs: number[] = JSON.parse(
            localStorage.getItem('pinnedIDs') || '[]',
          );

          this.pinnedRooms = this.rooms.filter((room) =>
            pinnedIDs.includes(room.ID),
          );
          this.otherRooms = this.rooms.filter(
            (room) => !pinnedIDs.includes(room.ID),
          );

          for (let i = 0; i < this.rooms.length; i++) {
            this.messages[i] = [];
            this.roomsService
              .getMessages(this.rooms[i].ID)
              .subscribe((response) => {
                this.messages[i] = response.messages;
              });
          }
        },
        error: (error) => {
          console.error('Ошибка при поиске комнат:', error);
        },
      });
    } else {
      this.refreshRooms();
    }
  }

  ngOnInit(): void {
    this.refreshRooms();
  }
}
