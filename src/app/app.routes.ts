import { Routes } from '@angular/router';
import { RegComponent } from './pages/reg/reg.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';

export const routes: Routes = [
  { path: 'reg', component: RegComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'recovery', component: RecoveryComponent },
];
