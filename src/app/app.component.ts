import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegComponent } from './pages/reg/reg.component';
import { BasicComponent } from './shared/layout/basic/basic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegComponent, BasicComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
