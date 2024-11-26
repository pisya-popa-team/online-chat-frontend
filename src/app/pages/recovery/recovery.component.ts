import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css',
})
export class RecoveryComponent {
  recoveryForm: FormGroup;

  toastrService = inject(ToastrService);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  isSent: boolean = false;

  constructor() {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      this.toastrService.error('Введите корректный email', 'Ошибка');
    } else {
      const formData = new FormData();
      formData.append('user_email', this.recoveryForm.value.email);

      this.authService.recoveryEmail(formData).subscribe({
        next: () => {
          this.toastrService.success(
            'На вашу почту отправлено письмо с дальнейшими инструкциями',
          );
          this.isSent = true;
        },
        error: (error) => {
          if (error.status == 404) {
            this.toastrService.error(
              'Пользователь с таким email не найден',
              'Ошибка',
            );
          } else if (error.status === 422) {
            this.toastrService.error('Введите корректный email', 'Ошибка');
          } else {
            this.toastrService.error(
              error.message,
              'Ошибка при отправке письма',
            );
            console.error(error);
          }
        },
      });
    }
  }
}
