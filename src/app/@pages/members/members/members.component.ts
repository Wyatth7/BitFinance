import { Component, OnInit } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MatChipListboxChange } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel } from 'src/app/shared/models/members/member-model';
import { TopNavService } from 'src/app/shared/services/top-nav.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class UsersComponent implements OnInit {
  renderUsers: boolean = true;
  listSortValue = 'newest'
  tableTitle = 'Users'

  constructor(private topNavService: TopNavService,
     private functions: Functions,
     private router: Router,
     private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
      this.topNavService.setTopNavAction({
        show: true,
        icon: 'person_add',
        tooltip: 'Create A User',
        action: () => this.navigateToCreate()
      })

      const call = httpsCallable(this.functions, 'testFunc')
      const res = await call();
      console.log(res);
      
  }

  navigateToCreate() {
    this.router.navigate(['../create'], {relativeTo: this.route})
  }

  change($event: MatChipListboxChange): void {
    if ($event.value === undefined) {
      this.renderUsers = true;
      this.tableTitle = 'Users';
      return;
    }

      this.renderUsers = $event.value;

      if (this.renderUsers) {
        this.tableTitle = 'Users'
        return;
      }

      this.tableTitle = 'Requested Users'
  }
  
  userData: MemberModel[] = [
    {
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      userName: "johndoe",
      profilePicture: "profile1.jpg",
      role: 1,
      isActive: false,
    },
    {
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      userName: "janesmith",
      profilePicture: "profile2.jpg",
      role: 2,
      isActive: false,
    },
    {
      email: "alice@example.com",
      firstName: "Alice",
      lastName: "Johnson",
      userName: "alicej",
      profilePicture: "profile3.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "william@example.com",
      firstName: "William",
      lastName: "Moore",
      userName: "williamm",
      profilePicture: "profile10.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "olivia@example.com",
      firstName: "Olivia",
      lastName: "Taylor",
      userName: "oliviat",
      profilePicture: "profile11.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "james@example.com",
      firstName: "James",
      lastName: "Thomas",
      userName: "jamest",
      profilePicture: "profile12.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "ava@example.com",
      firstName: "Ava",
      lastName: "Walker",
      userName: "avaw",
      profilePicture: "profile13.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "noah@example.com",
      firstName: "Noah",
      lastName: "Perez",
      userName: "noahp",
      profilePicture: "profile14.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "mia@example.com",
      firstName: "Mia",
      lastName: "Harris",
      userName: "miah",
      profilePicture: "profile15.jpg",
      role: 4,
      isActive: true,
    },
  ];

  requestedUserData: MemberModel[] = [
    {
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Brown",
      userName: "bobbrown",
      profilePicture: "profile4.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "susan@example.com",
      firstName: "Susan",
      lastName: "Davis",
      userName: "susand",
      profilePicture: "profile5.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "michael@example.com",
      firstName: "Michael",
      lastName: "Wilson",
      userName: "michaelw",
      profilePicture: "profile6.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "emily@example.com",
      firstName: "Emily",
      lastName: "Anderson",
      userName: "emilya",
      profilePicture: "profile7.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "david@example.com",
      firstName: "David",
      lastName: "Martinez",
      userName: "davidm",
      profilePicture: "profile8.jpg",
      role: 4,
      isActive: true,
    },
    {
      email: "laura@example.com",
      firstName: "Laura",
      lastName: "Garcia",
      userName: "laurag",
      profilePicture: "profile9.jpg",
      role: 4,
      isActive: true,
    }
  ];
}
