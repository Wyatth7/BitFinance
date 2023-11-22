import {AccountType} from "../../../enums/accounts/account-type";
import {NormalType} from "../../../enums/accounts/normal-type";
import {AccountEntry} from "../../journals/account-journal";
import {StatementType} from "../../../enums/accounts/statement-type";

export interface PreConfigurationRawData {
  accountName: string;
  accountType: AccountType;
  normalType: NormalType;
  statementType: StatementType;
  balance: number;
  entries: AccountEntry[];
}
