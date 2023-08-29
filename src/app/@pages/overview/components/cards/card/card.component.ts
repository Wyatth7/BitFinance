import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() subTitle: string = '';
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() buttonTitle: string = '';

}
