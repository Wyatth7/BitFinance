import { Component } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  get color(): typeof Colors {
    return Colors;
  }
}
