import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css',
})
export class CreateRoomComponent {
  @Input() type: 'public' | 'private' | null = null;
  @Output() callback = new EventEmitter<void>();

  triggerCallback() {
    this.callback.emit();
  }
}
