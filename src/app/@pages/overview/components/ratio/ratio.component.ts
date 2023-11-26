import {Component, Input} from '@angular/core';
import {RatioSummary} from "../../../../shared/models/ratios/ratio-summary";

@Component({
  selector: 'app-ratio',
  templateUrl: './ratio.component.html',
  styleUrls: ['./ratio.component.scss']
})
export class RatioComponent {
  @Input() ratioSummary!: RatioSummary;
}
