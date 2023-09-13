import { Component, Input } from '@angular/core';
import { Roles } from 'src/app/shared/enums/authentication/roles';
import { UserModel } from 'src/app/shared/models/users/user-model';

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})
export class MemberTableComponent {
  @Input() userData!: UserModel[];
  displayedColumns = ['actions', 'name', 'username', 'email', 'role', 'status']

  
  getRole(roleId: number): string {
    return Roles[roleId]
  }


}
