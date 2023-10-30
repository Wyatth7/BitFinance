import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-nav-button',
  templateUrl: './side-nav-button.component.html',
  styleUrls: ['./side-nav-button.component.scss']
})
export class SideNavButtonComponent {
  @Input() icon?: string;
  @Input() text: string = '';
  @Input() tooltip: string = '';
}
