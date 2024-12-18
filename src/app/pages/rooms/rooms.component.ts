import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';
import { StateService } from '../../services/state.service';
import { IMessage, IRoom } from '../../models/room';
import { NgForOf, NgIf } from '@angular/common';
import { RoomsService } from '../../services/rooms.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent, NgForOf, NgIf, FormsModule],
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
  }

  setRoomPassword() {
    this.isCreating = true;
    this.createType = 'private';
  }

  createRoom() {
    if (this.createType === 'private' && this.newRoomPassword.length < 1) {
      this.toastrService.error('Пароль не может быть пустым', 'Ошибка');
      return;
    }

    let formData = new FormData();
    if (this.newRoomPassword) {
      formData.append('password', this.newRoomPassword);
    }

    this.roomsService.createRoom(formData).subscribe({
      next: (response) => {
        this.isCreating = false;
        this.refreshRooms();
      },
      error: (error) => {
        this.isCreating = false;
        console.error(error);
      },
    });
    this.newRoomPassword = '';
  }

  refreshRooms() {
    this.rooms = [];

    this.roomsService.getRooms().subscribe((response) => {
      this.rooms = response.rooms;
      this.otherRooms = this.rooms;
      this.pinnedRooms = [];

      this.messages = new Array(this.rooms.length);

      for (let i = 0; i < this.rooms.length; i++) {
        this.messages[i] = [];
        this.roomsService
          .getMessages(this.rooms[i].ID)
          .subscribe((response) => {
            this.messages[i] = response.messages;
          });
      }
    });
  }

  ngOnInit(): void {
    this.refreshRooms();

    // this.pinnedRooms = this.rooms.filter((room) => room.pinned);
    // this.otherRooms = this.rooms.filter((room) => !room.pinned);

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
