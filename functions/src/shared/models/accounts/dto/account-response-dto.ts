import { AccountEntry } from "../../journals/account-journal";
import { AccountModel } from "../account-model";

export interface AccountResponseDto {
    account: AccountModel;
    entryList: AccountEntry[];
}