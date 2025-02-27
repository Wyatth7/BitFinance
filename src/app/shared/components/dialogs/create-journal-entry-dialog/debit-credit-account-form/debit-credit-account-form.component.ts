import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NormalType } from 'functions/src/shared/enums/accounts/normal-type';
import { AccountModel } from 'functions/src/shared/models/accounts/account-model';
import { Subject, Subscription } from 'rxjs';
import { AccountListItemModel } from 'src/app/shared/models/accounts/account-list/account-list-item-model';
import { TransactionEntryListItem } from 'src/app/shared/models/journal/transaction-entry-model';
import { AccountService } from 'src/app/shared/services/accounts/account.service';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';

@Component({
  selector: 'app-debit-credit-account-form',
  templateUrl: './debit-credit-account-form.component.html',
  styleUrls: ['./debit-credit-account-form.component.scss']
})
export class DebitCreditAccountFormComponent implements OnInit, OnDestroy {
  showSpinner = false;
  showAmountBalanceError = false;
  
  @Input() shouldReset$!: Subject<boolean>;
  private _resetSubscription!: Subscription;
  private _accountsSubscription!: Subscription;
  private _formChangeSubscription!: Subscription;

  form =  new FormGroup({
    account: new FormControl('', Validators.required),
    normalType: new FormControl(NormalType.debit, Validators.required),
    amount: new FormControl(1, [Validators.required, Validators.min(1)])
  })
  
  balance = 0;
  transactionList: TransactionEntryListItem[] = [];
  accountList?: AccountListItemModel[];
  selectedAccount?: AccountListItemModel;

  dataSource = new MatTableDataSource();

  transactionColumns = ['account', 'normalType', 'amount', 'delete']

  @Output() transactionChange = new EventEmitter<{transactions: TransactionEntryListItem[], isBalanced: boolean}>();


  constructor(private accountService: AccountService,
    public enumService: GetEnumValueService) { }

  async ngOnInit() {

    this._accountsSubscription = this.accountService.accounts$
        .subscribe(accounts => this.accountList = accounts.accounts);
    
    if (!this.accountList) {
      this.showSpinner = true;
      await this.accountService.getAccountList();
      this.showSpinner = false;
    }

    this._resetSubscription = this.shouldReset$.subscribe(reset => {
      if (!reset) return;
      this.transactionList = []
      this.dataSource.data = []
      this.balance = 0;

      this.resetForm();
    })

    this.form.valueChanges
      .subscribe(values => {
        this.accountAmountBalanceValidator(values)
      });
  }

  ngOnDestroy(): void {
    this._accountsSubscription.unsubscribe();
    this._resetSubscription.unsubscribe();
    this._formChangeSubscription.unsubscribe();
  }

  private accountAmountBalanceValidator(values: Partial<{
    account: string | null;
    normalType: NormalType | null;
    amount: number | null;
  }>){ 
    
    if (!values.account || !values.amount) return;

    const account = this.accountList?.find(account => account.accountId === values.account);    

    if (values.normalType !== account?.normalType) {
      this.showAmountBalanceError = values.amount > account!.balance;
      
      return;
    }

    this.showAmountBalanceError = false;
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

    // add transaction to list, emit the entire list if balance is 0
    this.transactionList.push(transaction)

    this.calculateBalance();
   
    if (this.balance === 0) {
      this.transactionChange.emit({transactions: this.transactionList, isBalanced: true});
    }else {
      this.transactionChange.emit({transactions:[], isBalanced: false})
    }

    this.dataSource.data = this.transactionList;
    
    this.resetForm();
  }
  
  /**
   * Removes / emits transactions as the remove button is clicked 
  */
 removeFromTransactionList(accountId: string) { 
    const index = this.transactionList.findIndex(transaction => transaction.accountId === accountId);

    this.transactionList.splice(index, 1);
    this.dataSource.data = this.transactionList;
    
    this.calculateBalance();

    if (this.balance === 0) {
      this.transactionChange.emit({transactions: this.transactionList, isBalanced: true});
    }else {
      this.transactionChange.emit({transactions:[], isBalanced: false})
    }
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
    });

    this.selectedAccount = undefined;
    this.showAmountBalanceError = false;
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
