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
import { IMessage } from '../../../models/room';
import { IUser } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';

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
  route = inject(ActivatedRoute);
  roomId: number = -1;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.chatInput.valid) {
      let userJSON = localStorage.getItem('user')
        ? localStorage.getItem('user')
        : '';
      let user: IUser = userJSON ? JSON.parse(userJSON) : null;

      let message: IMessage = {
        MessageType: 'user',
        Content: this.chatInput.value.content.trim(),
        SentAt: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        RoomID: this.webSocketService.currentRoomID,
        UserID: user.ID,
      };

      this.webSocketService.sendMessage(message);
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
