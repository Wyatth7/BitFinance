import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { Colors } from '../../enums/colors';
import { ValueTextType } from '../../enums/value-text-types.ts/value-text-type';
import { TitleCasePipe, formatCurrency, formatNumber } from '@angular/common';

@Component({
  selector: 'app-number-text',
  templateUrl: './number-text.component.html',
  styleUrls: ['./number-text.component.scss']
})
export class ValueTextComponent implements OnInit {

  @Input() value!: any;
  @Input() text: string = '';
  @Input() focusColor?: Colors;
  @Input() valueType: ValueTextType = ValueTextType.string;

  constructor(@Inject(LOCALE_ID) private locale: string, 
    private titleCasePipe: TitleCasePipe) {}

  ngOnInit(): void {
      switch(this.valueType) {
        case ValueTextType.currency:
          this.value = formatCurrency(this.value, this.locale, '$');
          break;
        case ValueTextType.number:
          this.value = formatNumber(this.value, this.locale)
          break;
        case ValueTextType.string:
            this.value = this.titleCasePipe.transform(this.value);
            break;
        default: break;
      }
  }
}
