import { Component } from '@angular/core';
import { Colors } from 'src/app/shared/enums/colors';
import { MemberModel } from 'src/app/shared/models/members/member-model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent {
  displayedColumns = ['name', 'joinedOn', 'endingOn', 'nextPayment', 'negativeBalance']
  memberData: MemberModel[] = [
    {
    name: "John Doe",
    membershipCreated: "2022-01-15",
    nextPayment: "2023-02-15",
    membershipEnding: "2023-03-15",
    hasNegativeBalance: false,
    email: "john.doe@example.com"
  },
  {
    name: "Jane Smith",
    membershipCreated: "2021-08-10",
    nextPayment: "2023-09-10",
    membershipEnding: "2023-10-10",
    hasNegativeBalance: true,
    email: "jane.smith@example.com"
  },
  {
    name: "Michael Johnson",
    membershipCreated: "2023-04-20",
    nextPayment: "2023-09-20",
    membershipEnding: "2023-10-20",
    hasNegativeBalance: false,
    email: "michael.johnson@example.com"
  },
  {
    name: "Emily Brown",
    membershipCreated: "2022-11-05",
    nextPayment: "2023-08-05",
    membershipEnding: "2023-09-05",
    hasNegativeBalance: true,
    email: "emily.brown@example.com"
  },
  {
    name: "William Davis",
    membershipCreated: "2023-03-12",
    nextPayment: "2023-09-12",
    membershipEnding: "2023-10-12",
    hasNegativeBalance: false,
    email: "william.davis@example.com"
  },
  {
    name: "Olivia Wilson",
    membershipCreated: "2022-09-25",
    nextPayment: "2023-08-25",
    membershipEnding: "2023-09-25",
    hasNegativeBalance: true,
    email: "olivia.wilson@example.com"
  },
  {
    name: "James Martinez",
    membershipCreated: "2021-12-07",
    nextPayment: "2023-02-07",
    membershipEnding: "2023-03-07",
    hasNegativeBalance: false,
    email: "james.martinez@example.com"
  },
  {
    name: "Sophia Taylor",
    membershipCreated: "2023-01-18",
    nextPayment: "2023-08-18",
    membershipEnding: "2023-09-18",
    hasNegativeBalance: true,
    email: "sophia.taylor@example.com"
  },
  {
    name: "Daniel Anderson",
    membershipCreated: "2022-05-30",
    nextPayment: "2023-09-30",
    membershipEnding: "2023-10-30",
    hasNegativeBalance: false,
    email: "daniel.anderson@example.com"
  },
  {
    name: "Ava Thomas",
    membershipCreated: "2023-06-14",
    nextPayment: "2023-08-14",
    membershipEnding: "2023-09-14",
    hasNegativeBalance: true,
    email: "ava.thomas@example.com"
  },
  {
    name: "Joseph White",
    membershipCreated: "2022-02-28",
    nextPayment: "2023-07-28",
    membershipEnding: "2023-08-28",
    hasNegativeBalance: false,
    email: "joseph.white@example.com"
  },
  {
    name: "Mia Harris",
    membershipCreated: "2023-07-03",
    nextPayment: "2023-09-03",
    membershipEnding: "2023-10-03",
    hasNegativeBalance: true,
    email: "mia.harris@example.com"
  },
  {
    name: "David Jackson",
    membershipCreated: "2022-10-09",
    nextPayment: "2023-08-09",
    membershipEnding: "2023-09-09",
    hasNegativeBalance: false,
    email: "david.jackson@example.com"
  },
  {
    name: "Sofia Miller",
    membershipCreated: "2023-03-21",
    nextPayment: "2023-09-21",
    membershipEnding: "2023-10-21",
    hasNegativeBalance: true,
    email: "sofia.miller@example.com"
  },
  {
    name: "Benjamin Brown",
    membershipCreated: "2022-08-13",
    nextPayment: "2023-08-13",
    membershipEnding: "2023-09-13",
    hasNegativeBalance: false,
    email: "benjamin.brown@example.com"
  },
  {
    name: "Chloe Wilson",
    membershipCreated: "2021-09-28",
    nextPayment: "2023-08-28",
    membershipEnding: "2023-09-28",
    hasNegativeBalance: true,
    email: "chloe.wilson@example.com"
  },
  {
    name: "Ethan Adams",
    membershipCreated: "2023-02-05",
    nextPayment: "2023-08-05",
    membershipEnding: "2023-09-05",
    hasNegativeBalance: false,
    email: "ethan.adams@example.com"
  },
  {
    name: "Liam Turner",
    membershipCreated: "2022-07-19",
    nextPayment: "2023-08-19",
    membershipEnding: "2023-09-19",
    hasNegativeBalance: true,
    email: "liam.turner@example.com"
  },
  {
    name: "Aria Hernandez",
    membershipCreated: "2023-04-26",
    nextPayment: "2023-08-26",
    membershipEnding: "2023-09-26",
    hasNegativeBalance: false,
    email: "aria.hernandez@example.com"
  },
  {
    name: "Mason Clark",
    membershipCreated: "2022-12-10",
    nextPayment: "2023-07-10",
    membershipEnding: "2023-08-10",
    hasNegativeBalance: true,
    email: "mason.clark@example.com"
  }
];
}
