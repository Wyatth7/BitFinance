import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/enums/authentication/roles';

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
  @Input() requiredButtonRoles?: Roles[];

  hasRequiredRole?: boolean;

  constructor(private router: Router) {}

  navigateToRoute() {
    this.router.navigateByUrl(this.route);
  }

  hasRoleEvent(hasRole: boolean) {
    this.hasRequiredRole = !hasRole;
  }

}
