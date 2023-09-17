import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from 'src/app/shared/enums/authentication/roles';
import { UserStatus } from 'src/app/shared/enums/user/user-status';
import { UserModel } from 'src/app/shared/models/users/user-model';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent {
  @Input() userData!: UserModel[];
  displayedColumns = ['actions', 'name', 'username', 'email', 'role', 'status']

  constructor(private router: Router) {}

  status(user: UserModel): string {
    
    const suspensionStatus = this.suspensionStatus(user);

    if (user.isActive && suspensionStatus) {
      return UserStatus.suspended;
    }

    return user.isActive ? UserStatus.active : UserStatus.inactive;
  }

  getRole(roleId: number): string {
    return Roles[roleId]
  }

  editClicked(uid: string) {
    this.router.navigateByUrl('users/edit/' + uid)
  }

  private suspensionStatus(user: UserModel): boolean {
    if (!user.suspended) return false;

    const today = new Date();

    return user.suspended.start <= today 
      && user.suspended.end >= today;
  }
}
