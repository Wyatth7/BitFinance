import { Component, OnInit } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';
import { OverviewDataModel } from 'src/app/shared/models/overview/overview-data';
import { OverviewService } from 'src/app/shared/services/overview/overview.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  overviewData: OverviewDataModel | undefined;

  constructor(private topNavService: TopNavService, private overviewService: OverviewService) { }

  async ngOnInit(): Promise<void> {
      this.topNavService.setTopNavAction({
        show: false,
        icon: '',
        tooltip: '',
        action: () => {}
      })

      this.overviewData = await this.overviewService.getOverviewData();
    }

  get color(): typeof Colors {
    return Colors;
  }
}
