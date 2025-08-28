import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cta-button.html',
  styleUrls: ['./cta-button.scss']
})
export class CtaButtonComponent {
  @Input() text: string = 'Button';
  @Input() type: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Input() routerLink: string = '';
  @Input() href: string = '';
}
