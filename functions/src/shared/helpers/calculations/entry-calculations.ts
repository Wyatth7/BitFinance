import { NormalType } from "../../enums/accounts/normal-type";
import { AccountModel } from "../../models/accounts/account-model";
import { Amounts } from "../../models/calculations/amounts";
import { Transaction } from "../../models/journals/transaction";

export class EntryCalculations {

    /**
     * Calculates entry totals
     * @param transactions List of transactions
     * @returns Amounts object
     */
    static calculateEntryTotals(transactions: Transaction[]): Amounts {

        const amounts: Amounts = {
            balance: 0,
            debit: 0,
            credit: 0
        };

        for (const transaction of transactions) {
            if (transaction.normalType === NormalType.debit) {
                amounts.debit += transaction.amount;
                amounts.balance += transaction.amount;
                continue;
            }

            amounts.credit += transaction.amount;
            amounts.balance -= transaction.amount;
        }

        return amounts;
    }

    /**
    * Calcuates the total of an account
    * @param account Account model
    * @param amounts credit and debit amounts
    * @returns balance of an account
    */
    static calculateAccountBalance(
        account: AccountModel,
        amounts: Amounts
        ): number {
            // if account normal side is debit, add debits, subtract credits from balance
            // else, subtract debits, add credits from balance
            if (account.normalType === NormalType.debit) {
                account.balance -= amounts.credit;
                account.balance += amounts.debit;
            } else {
                account.balance += amounts.credit;
                account.balance -= amounts.debit;
            }

            // update account balance
            return account.balance;
    }

}