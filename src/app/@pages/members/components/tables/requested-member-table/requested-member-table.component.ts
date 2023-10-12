import { Component, Input } from '@angular/core';
import { MemberModel } from 'src/app/shared/models/members/member-model';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-requested-member-table',
  templateUrl: './requested-member-table.component.html',
  styleUrls: ['./requested-member-table.component.scss']
})
export class RequestedMemberTableComponent {
  @Input() userData!: UserModel[]
  displayedColumns: string[] = ['actions', 'name', 'username', 'email'] 

  constructor(private userService: UserService) {}

  async acceptUser(userId: string) {
    await this.userService.acceptDenyUser(userId, true)
  }

  async declineUser(userId: string) {
    await this.userService.acceptDenyUser(userId);
  }
}
