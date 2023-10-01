import { Component, OnInit } from '@angular/core';
import { GetEnumValueService } from 'src/app/shared/services/enum/get-enum-value.service';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

interface JournalEntry {
  date: Date;
  description: string;
  transactionType: string;
  amount: number;
  createdBy: string;
}

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss']
})
export class SingleViewComponent implements OnInit{

  dateCreated = new Date();

  constructor(public getEnum: GetEnumValueService, private topNavService: TopNavService) {}

  ngOnInit(): void {
      this.topNavService.setTopNavAction({
        tooltip: 'Add Transaction',
        icon: 'add_card',
        action: () => {},
      })
  }

  displayedColumns = ['actions', 'description', 'transactionType', 'amount', 'createdBy','date']
  journalEntries: JournalEntry[] = [
    {
      date: new Date('2023-10-01'),
      description: 'Sales of Products',
      amount: 10000,
      transactionType: 'debit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-02'),
      description: 'Purchase of Supplies',
      amount: 500,
      transactionType: 'credit',
      createdBy: 'Wyatt Hardin',
    },
    {
      date: new Date('2023-10-03'),
      description: 'Payment of Rent',
      amount: 1500,
      transactionType: 'credit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-01'),
      description: 'Sales of Products',
      amount: 10000,
      transactionType: 'debit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-02'),
      description: 'Purchase of Supplies',
      amount: 500,
      transactionType: 'credit',
      createdBy: 'Wyatt Hardin',
    },
    {
      date: new Date('2023-10-03'),
      description: 'Payment of Rent',
      amount: 1500,
      transactionType: 'credit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-01'),
      description: 'Sales of Products',
      amount: 10000,
      transactionType: 'debit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-02'),
      description: 'Purchase of Supplies',
      amount: 500,
      transactionType: 'credit',
      createdBy: 'Wyatt Hardin',
    },
    {
      date: new Date('2023-10-03'),
      description: 'Payment of Rent',
      amount: 1500,
      transactionType: 'credit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-01'),
      description: 'Sales of Products',
      amount: 10000,
      transactionType: 'debit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-02'),
      description: 'Purchase of Supplies',
      amount: 500,
      transactionType: 'credit',
      createdBy: 'Wyatt Hardin',
    },
    {
      date: new Date('2023-10-03'),
      description: 'Payment of Rent',
      amount: 1500,
      transactionType: 'credit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-01'),
      description: 'Sales of Products',
      amount: 10000,
      transactionType: 'debit',
      createdBy: 'Andrew Quarles',
    },
    {
      date: new Date('2023-10-02'),
      description: 'Purchase of Supplies',
      amount: 500,
      transactionType: 'credit',
      createdBy: 'Wyatt Hardin',
    },
    {
      date: new Date('2023-10-03'),
      description: 'Payment of Rent',
      amount: 1500,
      transactionType: 'credit',
      createdBy: 'Andrew Quarles',
    },
    // Add more journal entries as needed
  ];
}
