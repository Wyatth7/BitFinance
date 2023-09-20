import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spinner-button',
  templateUrl: './spinner-button.component.html',
  styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent {
  /**
   * Material button color
   */
  @Input() color: string = 'primary'

  /**
   * Text for button
   */
  @Input() text!: string;

  /**
   * Value for button disabled status
   */
  @Input() disabled: boolean = false;

  /**
   * Toggle spinner on / off
   */
  @Input() spin = false;

}
