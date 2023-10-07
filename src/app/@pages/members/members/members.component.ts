import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { UserListModel } from 'src/app/shared/models/users/user-list-model';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class UsersComponent implements OnInit {
  renderUsers: boolean = true;
  listSortValue = 'newest'
  tableTitle = 'Users'
  users!: UserListModel;

  constructor(private topNavService: TopNavService,
     private router: Router,
     private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
      this.topNavService.setTopNav({
        topNavHeader: 'Users',
        topNavIcon: PageIcon.users.toString(),
        topNavAction: {
          icon: 'person_add',
          tooltip: 'Create A User',
          action: () => this.navigateToCreate()
        },
      })

      // redirect to view if /users is called
      if (this.router.url.split('/').length === 2) {
        this.router.navigate(['view'], {relativeTo: this.route});
      }
  }

  navigateToCreate() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }
}
