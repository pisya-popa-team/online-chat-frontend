import { Component, inject, OnInit } from '@angular/core';
import { RoomComponent } from '../../shared/components/room/room.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent implements OnInit {
  protected readonly String = String;

  private stateService = inject(StateService);

  ngOnInit(): void {
    this.stateService.setState({
      title: 'Румы',
      description: 'тотал 10 румов',
    });
  }
}
