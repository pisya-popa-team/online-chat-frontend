import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent implements OnInit {
  chatInput!: FormGroup;
  toastrService = inject(ToastrService);
  webSocketService = inject(WebsocketService);

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.chatInput.valid) {
      this.webSocketService.sendMessage({
        content: this.chatInput.value.content.trim(),
      });
      this.chatInput.reset();
    } else {
      this.toastrService.error('Сообщение не может быть пустым.', 'Ошибка');
    }
  }

  ngOnInit(): void {
    this.chatInput = this.fb.group({
      content: ['', [Validators.required, this.noWhitespaceValidator]],
    });
  }

  private noWhitespaceValidator(control: AbstractControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
