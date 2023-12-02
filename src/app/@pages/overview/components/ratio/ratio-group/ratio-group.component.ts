import {Component, Input, OnInit} from '@angular/core';
import {Colors} from "../../../../../shared/enums/colors";

@Component({
  selector: 'app-ratio-group',
  templateUrl: './ratio-group.component.html',
  styleUrls: ['./ratio-group.component.scss']
})
export class RatioGroupComponent implements OnInit {
  @Input() title: string = '';
  @Input() value!: Object;
  @Input() idealValue: number = 0;
  @Input() roundIdealUp: boolean = true;

  private _ratioGroup: {name: string, value: number}[] = [];

  get ratioGroup() {
    return this._ratioGroup;
  }

  isIdealRange(value: number): boolean {
    if (this.roundIdealUp) {
      return value >= this.idealValue;
    }

    return value <= this.idealValue;
  }

  ngOnInit() {

    // assign ratio names and values
    const entries = Object.entries(this.value);

    for (const [name, value] of entries) {
      this._ratioGroup.push({
        name: name.replace(/([a-z])([A-Z])/g, '$1 $2'),
        value
      });
    }

  }

  protected readonly Colors = Colors;
}
