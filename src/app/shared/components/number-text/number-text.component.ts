import { Component, Inject, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Colors } from '../../enums/colors';
import { ValueTextType } from '../../enums/value-text-types.ts/value-text-type';
import { TitleCasePipe, formatCurrency, formatNumber } from '@angular/common';

@Component({
  selector: 'app-number-text',
  templateUrl: './number-text.component.html',
  styleUrls: ['./number-text.component.scss']
})
export class ValueTextComponent implements OnInit, OnChanges {

  @Input() value!: any;
  @Input() text: string = '';
  @Input() focusColor?: Colors;
  @Input() valueType: ValueTextType = ValueTextType.string;

  valueText!: string;

  constructor(@Inject(LOCALE_ID) private locale: string, 
    private titleCasePipe: TitleCasePipe) {}

  ngOnInit(): void {
    this.formatValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.formatValue()
  }

  private formatValue() {
    switch(this.valueType) {
      case ValueTextType.currency:
        this.valueText = formatCurrency(this.value, this.locale, '$');
        break;
      case ValueTextType.number:
        this.valueText = formatNumber(this.value, this.locale)
        break;
      case ValueTextType.string:
          this.valueText = this.titleCasePipe.transform(this.value);
          break;
      default: break;
    }
  }
}
