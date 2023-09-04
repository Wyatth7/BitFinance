import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';
import { TopNavService } from 'src/app/shared/services/top-nav.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private topNavService: TopNavService) { }

  ngOnInit(): void {
      this.topNavService.setTopNavAction({
        show: false,
        icon: '',
        tooltip: '',
        action: () => {}
      })
  }

  get color(): typeof Colors {
    return Colors;
  }
}
