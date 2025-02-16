import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { ChatInputComponent } from '../../components/chat-input/chat-input.component';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, ChatInputComponent],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent implements OnInit {
  title: string = '';
  description: string = '';
  link: string = '';
  linkName: string = '';

  router = inject(Router);

  usersService = inject(UsersService);
  authService = inject(AuthService);
  cdr = inject(ChangeDetectorRef);
  user?: IUser;

  logout() {
    this.authService.logout();
  }

  setState(payload: { state$: Observable<any> }) {
    console.log(payload.state$);

    payload.state$.subscribe((state) => {
      this.title = state.title;
      this.description = state.description;
      this.link = state.link ?? '';
      this.linkName = state.linkName ?? '';
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.usersService.getCurrentUser().subscribe({
        next: (response) => {
          this.user = response.user;
          if (this.user) {
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    if (!this.user) {
      const _user = localStorage.getItem('user');
      this.user = _user
        ? JSON.parse(_user)
        : {
            ID: 0,
            Username: '',
            Email: '',
            Room: [],
          };
    }
  }
}
