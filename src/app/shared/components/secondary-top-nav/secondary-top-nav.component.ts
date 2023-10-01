import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * This component is indented to be used as a 
 * secondary nav below the top nav, however, 
 * this component can be used anywhere.
 */
@Component({
  selector: 'app-secondary-top-nav',
  templateUrl: './secondary-top-nav.component.html',
  styleUrls: ['./secondary-top-nav.component.scss']
})
export class SecondaryTopNavComponent {
  
  @Input() title!: string;
  @Input() showSearch = true;
  @Input() searchPlaceholder = 'Search';
  @Input() selectOptions!: {value: any; title: string}[];

  @Output() searchString = new EventEmitter<string | null>();
  @Output() filterString = new EventEmitter<string>();

  set searchValue(value: string) {
    this.searchString.emit(value)
  }
}
