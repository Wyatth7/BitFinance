import { Component, OnInit } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { UserListModel } from 'src/app/shared/models/users/user-list-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  renderUsers: boolean = true;
  listSortValue = 'newest'
  tableTitle = 'Users'
  users!: UserListModel;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUserList();
  }

  change($event: MatChipListboxChange): void {
    if ($event.value === undefined) {
      this.renderUsers = true;
      this.tableTitle = 'Users';
      return;
    }

      this.renderUsers = $event.value;

      if (this.renderUsers) {
        this.tableTitle = 'Users'
        return;
      }

      this.tableTitle = 'Requested Users'
  }
}
