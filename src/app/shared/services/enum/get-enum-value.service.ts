import { Injectable } from '@angular/core';
import { Colors } from '../../enums/colors';
import { AccountType } from '../../enums/accounts/account-type';
import { ValueTextType } from '../../enums/value-text-types.ts/value-text-type';
import { NormalType } from '../../enums/accounts/normal-type';
import { JournalApprovalType } from '../../enums/journals/journal-entry-approval-type';

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
}
