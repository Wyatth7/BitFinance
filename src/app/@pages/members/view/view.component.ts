import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatChipListbox, MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserListModel } from 'src/app/shared/models/users/user-list-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  renderUsers: boolean = true;
  listSortValue = 'newest'
  tableTitle = 'Users'
  users?: UserListModel;

  userSubscription!: Subscription;

  @ViewChild('chipList') chipList!: MatChipListbox;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {

    this.userSubscription = this.userService.users$
      .subscribe(users => this.users = users);

    await this.userService.getUserList();

  }

  ngOnDestroy(): void {
      this.userSubscription.unsubscribe();
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

  emptyListAction() {
    if (this.renderUsers) {
      this.router.navigate(['../create'], {relativeTo: this.route});
      return;
    }

    this.change({value: true} as MatChipListboxChange);
    
    this.chipList.value = true;
  }
}
