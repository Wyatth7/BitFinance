import { Component, Input } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';

@Component({
  selector: 'app-nav-member-total',
  templateUrl: './nav-member-total.component.html',
  styleUrls: ['./nav-member-total.component.scss']
})
export class NavMemberTotalComponent {
  @Input() focusText: string = '';
  @Input() plainText: string = '';
  @Input() focusColor?: Colors;
}
