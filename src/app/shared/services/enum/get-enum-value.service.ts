import { Injectable } from '@angular/core';
import { Colors } from '../../enums/colors';
import { AccountType } from '../../enums/accounts/account-type';
import { ValueTextType } from '../../enums/value-text-types.ts/value-text-type';

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

  get valuTextType(): typeof ValueTextType {
    return ValueTextType;
  }
}
