import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-number-group',
  templateUrl: './number-group.component.html',
  styleUrls: ['./number-group.component.scss']
})
export class NumberGroupComponent {

  @Input() color!: string;
  @Input() number!: number;
  @Input() text!: string;
}
