import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { IconDatabase } from '../../../helpers/icons-database';

@Component({
  selector: 'app-dark-button',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './dark-button.component.html',
  styleUrl: './dark-button.component.css',
})
export class DarkButtonComponent {
  @Input() title: string | null = null;
  @Input() iconName: string | null = null;
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }

  getIconPath(name: string) {
    return IconDatabase[name] || '';
  }
}
