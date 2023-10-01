import { Component, Input } from '@angular/core';
import { Colors } from '../../enums/colors';

@Component({
  selector: 'app-number-text',
  templateUrl: './number-text.component.html',
  styleUrls: ['./number-text.component.scss']
})
export class NumberTextComponent {

  @Input() number: number = 0;
  @Input() text: string = '';
  @Input() focusColor?: Colors;
}
