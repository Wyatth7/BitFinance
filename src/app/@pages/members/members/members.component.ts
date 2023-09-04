import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatChipListboxChange } from '@angular/material/chips';
import { Colors } from 'src/app/shared/enums/colors';
import { MemberModel } from 'src/app/shared/models/members/member-model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class UsersComponent {
  renderUserType: string = 'users';
  listSortValue = 'newest'

  selection = new SelectionModel<MemberModel>(true, []);
  displayedColumns = ['select', 'name', 'username', 'email', 'role', 'status']
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
      role: 1,
      isActive: true,
    },
    {
      email: "bob@example.com",
      firstName: "Bob",
      lastName: "Brown",
      userName: "bobbrown",
      profilePicture: "profile4.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "susan@example.com",
      firstName: "Susan",
      lastName: "Davis",
      userName: "susand",
      profilePicture: "profile5.jpg",
      role: 1,
      isActive: true,
    },
    {
      email: "michael@example.com",
      firstName: "Michael",
      lastName: "Wilson",
      userName: "michaelw",
      profilePicture: "profile6.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "emily@example.com",
      firstName: "Emily",
      lastName: "Anderson",
      userName: "emilya",
      profilePicture: "profile7.jpg",
      role: 1,
      isActive: true,
    },
    {
      email: "david@example.com",
      firstName: "David",
      lastName: "Martinez",
      userName: "davidm",
      profilePicture: "profile8.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "laura@example.com",
      firstName: "Laura",
      lastName: "Garcia",
      userName: "laurag",
      profilePicture: "profile9.jpg",
      role: 1,
      isActive: true,
    },
    {
      email: "william@example.com",
      firstName: "William",
      lastName: "Moore",
      userName: "williamm",
      profilePicture: "profile10.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "olivia@example.com",
      firstName: "Olivia",
      lastName: "Taylor",
      userName: "oliviat",
      profilePicture: "profile11.jpg",
      role: 1,
      isActive: true,
    },
    {
      email: "james@example.com",
      firstName: "James",
      lastName: "Thomas",
      userName: "jamest",
      profilePicture: "profile12.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "ava@example.com",
      firstName: "Ava",
      lastName: "Walker",
      userName: "avaw",
      profilePicture: "profile13.jpg",
      role: 1,
      isActive: true,
    },
    {
      email: "noah@example.com",
      firstName: "Noah",
      lastName: "Perez",
      userName: "noahp",
      profilePicture: "profile14.jpg",
      role: 2,
      isActive: true,
    },
    {
      email: "mia@example.com",
      firstName: "Mia",
      lastName: "Harris",
      userName: "miah",
      profilePicture: "profile15.jpg",
      role: 1,
      isActive: true,
    },
  ];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.userData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.userData);
  }

  change($event: MatChipListboxChange): void {
    if (!$event.value) {
      this.renderUserType = 'users';
      return;
    }

      this.renderUserType = $event.value;
  }
}
