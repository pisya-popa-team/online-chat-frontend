import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isSubmitting = false;

  toastrService = inject(ToastrService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.toastrService.error('Заполните обязательные поля', 'Ошибка');
    } else {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('email', this.authForm.value.email);
      formData.append('password', this.authForm.value.password);
      console.log(formData);
      this.authService.auth(formData).subscribe({
        next: (user) => {
          this.authForm.reset();
          this.isSubmitting = false;
          localStorage.setItem('accessToken', user.tokens.access_token);
          localStorage.setItem('refreshToken', user.tokens.refresh_token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastrService.error(
              'Неверная почта или пароль',
              'Ошибка авторизации',
            );
          } else {
            this.toastrService.error(error.message, 'Ошибка авторизации');
            console.error(error);
          }
          this.isSubmitting = false;
        },
      });
    }
  }
}
