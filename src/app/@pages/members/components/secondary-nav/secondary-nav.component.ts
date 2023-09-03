import { Component } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';

@Component({
  selector: 'app-members-secondary-nav',
  templateUrl: './secondary-nav.component.html',
  styleUrls: ['./secondary-nav.component.scss']
})
export class SecondaryNavComponent {
  selectedValue = 'newest';

  get color(): typeof Colors {
    return Colors;
  }
}
