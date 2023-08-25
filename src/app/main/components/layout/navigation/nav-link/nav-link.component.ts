import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss']
})
export class NavLinkComponent {
  @Input() icon?: string;
  @Input() text: string = '';
  @Input() route: string = '';
  @Input() tooltip: string = '';
}
