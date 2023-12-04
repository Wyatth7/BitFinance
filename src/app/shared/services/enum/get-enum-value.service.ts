import { Injectable } from '@angular/core';
import { Colors } from '../../enums/colors';
import { AccountType } from '../../enums/accounts/account-type';
import { ValueTextType } from '../../enums/value-text-types.ts/value-text-type';
import { NormalType } from '../../enums/accounts/normal-type';
import { JournalApprovalType } from '../../enums/journals/journal-entry-approval-type';
import { StatementType } from '../../enums/accounts/statement-type';
import {ReportType} from "../../enums/reports/report-type";

@Injectable({
  providedIn: 'root'
})
export class GetEnumValueService {

  constructor() { }

  get color(): typeof Colors {
    return Colors;
  }

  get accountType(): typeof AccountType {
    return AccountType;
  }


  accountTypeString(accountType: AccountType): string {
    return AccountType[accountType];
  }

  get statementType(): typeof StatementType {
    return StatementType;
  }

  statementTypeString(statementType: StatementType): string {
    switch(statementType) {
      case StatementType.BS:
        return 'Balance Sheet';
      case StatementType.IS:
        return 'Income Statement';
      case StatementType.RE:
        return 'Retained Earnings';
    }
  }

  get journalApprovalType(): typeof JournalApprovalType {
    return JournalApprovalType;
  }

  journalApprovalTypeString(approvalType: JournalApprovalType) {
    return JournalApprovalType[approvalType];
  }

  get valuTextType(): typeof ValueTextType {
    return ValueTextType;
  }

  get normalType(): typeof NormalType {
    return NormalType;
  }

  normalTypeString(normalType: NormalType) {
    return NormalType[normalType];
  }

  get reportType(): typeof ReportType {
    return ReportType;
  }
}
