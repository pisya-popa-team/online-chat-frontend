import { Component } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-newpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './newpass.component.html',
  styleUrl: './newpass.component.css',
})
export class NewpassComponent {}
