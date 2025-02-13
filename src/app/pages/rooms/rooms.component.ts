import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';
import { StateService } from '../../services/state.service';
import { IMessage, IRoom } from '../../models/room';
import { NgForOf, NgIf } from '@angular/common';
import { RoomsService } from '../../services/rooms.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DarkButtonComponent } from '../../shared/components/dark-button/dark-button.component';

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
  private stateService = inject(StateService);
  private roomsService = inject(RoomsService);
  private toastrService = inject(ToastrService);

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

    this.roomsService.getRooms().subscribe((response) => {
      this.rooms = response.rooms;

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
    });
  }

  ngOnInit(): void {
    this.refreshRooms();
  }
}
