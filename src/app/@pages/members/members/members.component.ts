import { Component } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {

  get color(): typeof Colors {
    return Colors;
  }
}
