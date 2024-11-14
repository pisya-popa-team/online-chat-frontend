import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IUser } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent implements OnInit {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() link_name: string = '';
  @Input() description: string = '';

  api = inject(ApiService);
  users = inject(UsersService);
  router = inject(Router);
  user?: IUser;

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.users.getCurrentUser().subscribe({
      next: (response) => {
        this.user = response.user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
