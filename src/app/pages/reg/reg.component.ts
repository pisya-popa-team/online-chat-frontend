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
  selector: 'app-reg',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css',
})
export class RegComponent implements OnInit {
  registrationForm: FormGroup;

  toastrService = inject(ToastrService);
  router = inject(Router);
  authService = inject(AuthService);

  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      const controls = this.registrationForm.controls;

      if (controls['username'].invalid) {
        this.toastrService.error(
          'Псевдоним должен содержать не менее 3 символов',
          'Ошибка',
        );
      } else if (controls['email'].invalid) {
        this.toastrService.error('Введите корректный email', 'Ошибка');
      } else if (controls['password'].invalid) {
        this.toastrService.error(
          'Пароль должен содержать не менее 7 символов, заглавные буквы, цифры и спец. символы',
          'Ошибка',
        );
      }
    } else {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('username', this.registrationForm.value.username);
      formData.append('email', this.registrationForm.value.email);
      formData.append('password', this.registrationForm.value.password);
      this.authService.register(formData).subscribe({
        next: (user) => {
          this.toastrService.success('Регистрация успешна');
          this.registrationForm.reset();
          this.isSubmitting = false;

          localStorage.setItem('accessToken', user.tokens.access_token);
          localStorage.setItem('refreshToken', user.tokens.refresh_token);
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error.status === 422) {
            this.toastrService.error(
              'Пароль должен содержать не менее 7 символов, заглавные буквы, цифры и спец. символы',
              'Ошибка регистрации',
            );
          } else if (error.status === 409) {
            this.toastrService.error(
              'Пользователь с таким именем или почтой уже существует',
              'Ошибка регистрации',
            );
          } else {
            this.toastrService.error(error.message, 'Ошибка регистрации');
            console.error(error);
          }
          this.isSubmitting = false;
        },
      });
    }
  }
}
