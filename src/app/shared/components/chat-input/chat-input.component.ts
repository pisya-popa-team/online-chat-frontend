import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
})
export class ChatInputComponent implements OnInit {
  chatInput: FormGroup;
  toastrService = inject(ToastrService);

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.chatInput.valid) {
      const formData = new FormData();
      formData.append('content', this.chatInput.value.content);
      console.log(formData.get('content'));
      this.chatInput.reset();
    } else {
      this.toastrService.error('Сообщение не может быть пустым.', 'Ошибка');
    }
  }

  ngOnInit(): void {
    this.chatInput = this.fb.group({
      content: ['', [Validators.required]],
    });
  }
}
