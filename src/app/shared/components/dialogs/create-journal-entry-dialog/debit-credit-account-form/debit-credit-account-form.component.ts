import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NormalType } from 'functions/src/shared/enums/accounts/normal-type';
import { AccountModel } from 'functions/src/shared/models/accounts/account-model';
import { Subscription } from 'rxjs';
import { AccountListItemModel } from 'src/app/shared/models/accounts/account-list/account-list-item-model';
import { TransactionEntryListItem } from 'src/app/shared/models/journal/transaction-entry-list-item-model';
import { AccountService } from 'src/app/shared/services/accounts/account.service';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';

@Component({
  selector: 'app-debit-credit-account-form',
  templateUrl: './debit-credit-account-form.component.html',
  styleUrls: ['./debit-credit-account-form.component.scss']
})
export class DebitCreditAccountFormComponent implements OnInit, OnDestroy {
  private _accountsSubscription!: Subscription;

  form = new FormGroup({
    account: new FormControl('', Validators.required),
    normalType: new FormControl(NormalType.debit, Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(1)])
  })
  
  balance = 0;
  transactionList: TransactionEntryListItem[] = [];
  accountList?: AccountListItemModel[];

  dataSource = new MatTableDataSource();

  transactionColumns = ['account', 'normalType', 'amount', 'delete']

  @Output() transactionChange = new EventEmitter<TransactionEntryListItem[]>();


  constructor(private accountService: AccountService,
    public enumService: GetEnumValueService) { }

  async ngOnInit() {
    this._accountsSubscription = this.accountService.accounts$
        .subscribe(accounts => this.accountList = accounts.accounts);
    
    if (!this.accountList) {
      await this.accountService.getAccountList();
    }
  }

  ngOnDestroy(): void {
    this._accountsSubscription.unsubscribe();
  }

  /**
   * Adds / emits transactions as the add button is clicked. 
   */
  addToTransactionList() {
    // get the account in question
    // if null, return
    const account = this.accountList?.find(account => account.accountId === this.form.value.account);
    if (!account) return;

    const transaction: TransactionEntryListItem = {
      accountName: account?.accountName,
      accountId: account?.accountId,
      amount: this.form.value.amount!,
      normalType: this.form.value.normalType!
    }

    // add transaction to list, emit the entire list
    this.transactionList.push(transaction)
    this.transactionChange.emit(this.transactionList);

    this.dataSource.data = this.transactionList;
    
    this.resetForm();
    this.calculateBalance();
  }
  
  /**
   * Removes / emits transactions as the remove button is clicked 
  */
 removeFromTransactionList(accountId: string) { 
    const index = this.transactionList.findIndex(transaction => transaction.accountId === accountId);

    this.transactionList.splice(index, 1);
    this.dataSource.data = this.transactionList;
    this.transactionChange.emit(this.transactionList);

    this.calculateBalance();
  }

  /**
   * Calculates the balance of all transactions entered.
   */
  private calculateBalance() {
    let balance = 0;
    this.transactionList
      .forEach(transaction => {
        if (transaction.normalType === NormalType.debit) {
          balance += transaction.amount;
          return;
        }

        balance -= transaction.amount;
      });
    
      this.balance = balance;
  }

  resetForm() {
    this.form.reset();

    this.form.setValue({
      account: null,
      normalType: NormalType.debit,
      amount: 1
    })
  }

  /**
   * Sets the balance color 
   */
  setBalanceClass() { 
    switch(true) {
      case (this.balance < 0):
        return 'red';
      case (this.balance === 0):
        return 'green';
      case (this.balance > 0):
        return 'blue';
      default: return 'red'
    }
  }
}
