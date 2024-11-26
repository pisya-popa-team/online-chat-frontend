import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-newpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newpass.component.html',
  styleUrl: './newpass.component.css',
})
export class NewpassComponent implements OnInit {
  newPasswordForm: FormGroup;
  token: string | null = null;

  toastrService = inject(ToastrService);
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) this.router.navigate(['/recovery']);
  }

  onSubmit() {
    if (this.newPasswordForm.invalid) {
      this.toastrService.error(
        'Пароль должен содержать не менее 7 символов, заглавные буквы, цифры и спец. символы',
        'Ошибка',
      );
    } else {
      const { newPassword, confirmPassword } = this.newPasswordForm.value;

      if (newPassword !== confirmPassword) {
        this.toastrService.error('Пароли не совпадают', 'Ошибка');
        return;
      }

      let data = new FormData();
      data.append('token', this.token ? this.token : '');
      data.append('password', newPassword);

      this.authService.recoveryPassword(data).subscribe({
        next: () => {
          this.toastrService.success('Пароль успешно изменен', 'Успех');
          this.router.navigate(['/auth']);
        },
        error: (error) => {
          if (error.status == 401) {
            this.toastrService.error(
              'Ссылка на изменение пароля устарела',
              'Ошибка',
            );
            this.router.navigate(['/recovery']);
          } else if (error.status == 422) {
            this.toastrService.error(
              'Пароль должен содержать не менее 7 символов, заглавные буквы, цифры и спец. символы',
              'Ошибка',
            );
          } else {
            this.toastrService.error(error.message, 'Ошибка');
            console.error(error);
          }
        },
      });
    }
  }
}
