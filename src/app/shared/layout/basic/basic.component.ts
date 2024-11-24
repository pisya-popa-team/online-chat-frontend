import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent implements OnInit {
  title: string = '';
  description: string = '';
  link: string = '';
  linkName: string = '';

  stateService = inject(StateService);
  users = inject(UsersService);
  router = inject(Router);
  user?: IUser;

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.stateService.state$.subscribe((state) => {
      this.title = state.title;
      this.description = state.description;
      this.link = state.link;
      this.linkName = state.linkName;
    });

    this.users.getCurrentUser().subscribe({
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
