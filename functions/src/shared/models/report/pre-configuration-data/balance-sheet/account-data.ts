import {AccountType} from "../../../enums/account-type";
import {NormalType} from "../../../../enums/accounts/normal-type";

export interface AccountData {
  accountName: string;
  balance: number[] | number;
  accountType: AccountType;
  normalType: NormalType;
}
