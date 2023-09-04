import { Component, Input } from '@angular/core';
import { MemberModel } from 'src/app/shared/models/members/member-model';

@Component({
  selector: 'app-requested-member-table',
  templateUrl: './requested-member-table.component.html',
  styleUrls: ['./requested-member-table.component.scss']
})
export class RequestedMemberTableComponent {
  @Input() userData!: MemberModel[]
  displayedColumns: string[] = ['actions', 'name', 'username', 'email'] 

  acceptUser() {
    console.log('user accepted');
  }

  declineUser() {
    console.log('user rejected');
    
  }
}
