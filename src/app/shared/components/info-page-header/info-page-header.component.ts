import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info-page-header',
  templateUrl: './info-page-header.component.html',
  styleUrls: ['./info-page-header.component.scss']
})
export class InfoPageHeaderComponent {
  @Input() title!: string;
}
