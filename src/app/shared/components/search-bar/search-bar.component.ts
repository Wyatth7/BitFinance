import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() inputChanged = new EventEmitter<string | null>();

  value = '';

  emitValue() {
    this.inputChanged.emit(this.value)
  }
}
