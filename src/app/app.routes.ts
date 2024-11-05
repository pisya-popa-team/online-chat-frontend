import { Routes } from '@angular/router';
import { RegComponent } from './pages/reg/reg.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { BasicComponent } from './shared/layout/basic/basic.component';
import { LoginComponent } from './shared/layout/login/login.component';
import { NewpassComponent } from './pages/newpass/newpass.component';

export const routes: Routes = [
  { path: '', component: BasicComponent },
  {
    path: 'auth',
    component: LoginComponent,
    children: [
      { path: '', component: AuthComponent },
      { path: 'reg', component: RegComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'newpass', component: NewpassComponent },
    ],
  },
];
