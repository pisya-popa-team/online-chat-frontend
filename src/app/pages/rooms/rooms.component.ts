import { Component } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  protected readonly String = String;
}
