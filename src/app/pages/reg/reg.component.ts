import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../services/registration.service';

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
  registrationService = inject(RegistrationService);

  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
          'Пароль должен содержать не менее 6 символов',
          'Ошибка',
        );
      }
    } else {
      this.isSubmitting = true;
      console.log('Форма валидна');
    }
  }
}
