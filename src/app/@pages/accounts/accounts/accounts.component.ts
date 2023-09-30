import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor(private topNavService: TopNavService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.topNavService.setTopNav({
        topNavHeader: 'Accounts',
        topNavIcon: PageIcon.accounts.toString(),
        topNavAction: {
          icon: 'post_add',
          tooltip: 'Create An Account',
          action: () => {}
        }
      })
    }
}
