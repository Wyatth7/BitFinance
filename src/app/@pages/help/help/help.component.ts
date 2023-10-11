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

  items = ['Adding Users', 'Editing Users', 'Deactivating Users', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  constructor(private topNavService: TopNavService) {}

  ngOnInit(): void {
    this.topNavService.setTopNav({
      topNavHeader: 'Help',
      topNavIcon: PageIcon.help.toString()
    });
    
    
  }

  postDescript(): string{

  
    return "Bruh Im chanign this form this function in TS"
  }
}
