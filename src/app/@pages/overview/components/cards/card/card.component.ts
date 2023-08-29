import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigateToRoute() {
    this.router.navigateByUrl(this.route);
  }

}
