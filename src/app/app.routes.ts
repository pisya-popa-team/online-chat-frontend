import { Routes } from '@angular/router';
import { RegComponent } from './pages/reg/reg.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { BasicComponent } from './shared/layout/basic/basic.component';
import { LoginComponent } from './shared/layout/login/login.component';
import { NewpassComponent } from './pages/newpass/newpass.component';
import { authGuard } from './guards/auth.guard';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomComponent } from './pages/room/room.component';
import { ChatInputComponent } from './widgets/chat-input/chat-input.component';

export const routes: Routes = [
  {
    path: '',
    component: BasicComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: RoomsComponent },
      {
        path: 'room/:id',
        component: ChatInputComponent,
        outlet: 'chat-input',
      },
      {
        path: 'room/:id',
        component: RoomComponent,
      },
    ],
  },
  {
    path: '',
    component: LoginComponent,
    canDeactivate: [authGuard],
    children: [
      { path: 'auth', component: AuthComponent },
      { path: 'reg', component: RegComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'newpass', component: NewpassComponent },
    ],
  },
];
