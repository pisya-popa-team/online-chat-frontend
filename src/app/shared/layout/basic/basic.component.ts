import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-basic',
  standalone: true,
  imports: [NgIf, RouterOutlet],
  templateUrl: './basic.component.html',
  styleUrl: './basic.component.css',
})
export class BasicComponent {
  @Input() title: string = '';
  @Input() link: string = '';
  @Input() link_name: string = '';
  @Input() description: string = '';
}
