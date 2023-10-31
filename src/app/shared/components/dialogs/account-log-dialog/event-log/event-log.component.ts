import { Component, Input } from '@angular/core';
import { AccountModel } from 'src/app/shared/models/accounts/account-model';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.scss']
})
export class EventLogComponent {

  constructor(public getEnum: GetEnumValueService) {}

  @Input() accountModel?: AccountModel;
  @Input() title!: string;
}
