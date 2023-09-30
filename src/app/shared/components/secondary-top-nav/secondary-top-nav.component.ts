import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * This component can be placed anywhere on the page.
 */
@Component({
  selector: 'app-secondary-top-nav',
  templateUrl: './secondary-top-nav.component.html',
  styleUrls: ['./secondary-top-nav.component.scss']
})
export class SecondaryTopNavComponent {
  
  @Input() title!: string;
  @Input() showCustomContent = false;
  @Input() searchPlaceholder = 'Search';
  @Input() selectOptions!: {value: any; title: string}[];

  @Output() searchString = new EventEmitter<string | null>();
  @Output() filterString = new EventEmitter<string>();

  set searchValue(value: string) {
    this.searchString.emit(value)
  }
}
