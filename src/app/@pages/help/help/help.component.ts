import { Component, OnInit, ViewChild } from '@angular/core';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { TopNavService } from 'src/app/shared/services/top-nav.service';
import { MatChipsModule} from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {


  constructor(private topNavService: TopNavService) {}

  ngOnInit(): void {
    this.topNavService.setTopNav({
      topNavHeader: 'Help',
      topNavIcon: PageIcon.help.toString()
    });
    
    
  }
}
