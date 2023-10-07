import { Component, OnInit } from '@angular/core';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {

  constructor(private topNavService: TopNavService) {}

  ngOnInit(): void {
      
    this.topNavService.setTopNav({
      topNavHeader: 'Journal',
      topNavIcon: PageIcon.accounts.toString(),
      topNavAction: {
        icon: PageIcon.card.toString(),
        tooltip: 'Create An Entry',
        action: () => {},
      },
    })
  }
}
