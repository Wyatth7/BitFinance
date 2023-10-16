import { Component, OnInit, ViewChild } from '@angular/core';
import { PageIcon } from 'src/app/shared/enums/page-icon';
import { TopNavService } from 'src/app/shared/services/top-nav.service';
import { MatChipsModule} from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  //Each section of the 'Help' screen has its information stored in the array 'helpTabs'. 
  //Each step within a dropdown menu is stored in the string array 'content'. 
  //Lots of arrays to save space. 

  helpTabs = [
    //Just the General FAQ info
    {
      tabLabel: 'FAQ',
        items: [
          { label: 'What is BitFinance?', 
            content: [
            'BitFinance is an Angular web app created for the College of Computing & Software Engineering at Kennesaw State University.', 
            'Student authors include Victoria Biyadglgne, Wyatt Hardin, Tom Porter, and Nelso Villalobos.'
                    ] },
                ]
    },
    //User help info
    {
      tabLabel: 'User Help',
      items: [
        { label: 'Adding Users', 
          content: [
                      'Step 1: Click the "View Users" button under the "Users" section of the home page',
                      'Step 2: Click the pink “Add User” icon at the top of the page',
                      'Step 3: Fill out the “Create User” form',
                      'Step 4: Click “Create” at the bottom of the page',
                      '',
                      'The new user will be added to the list of “Current Users”.'
                    ] },
        { label: 'Editing Users', 
          content: [
                      'Step 1: Click the "View Users" button under the "Users" section of the home page',
                      'Step 2: Click "View" next to the user that you wish to make changes to',
                      'Step 3: Use the "Edit User" form to make any necessary changes',
                      'Step 4: Click "Update" to apply changes',
                      '',
                      'Any changes made to the user will be updated in the list of "Current Users".'
          ] },
        { label: 'Activate or Deactivate a User', 
          content: [                 
            'Step 1: Click the "View Users" button under the "Users" section of the home page',
            'Step 2: Click "View" next to the user that you wish to deactivate',
            'Step 3: Under the "Advanced" section, click "Deactivate User" to view the current activation status of the user',
            'Step 4: Click "Activate" or "Deactivate" to change the status of the user, as desired',
        ] },
      ]
    },
    //Accounts help info
    {
      tabLabel: 'Accounts Help',
      items: [
        { label: 'Creating a New Account', 
          content: [
            'Step 1: Click the "View Accounts" button under the "Chart of Accounts" section of the home page',
            'Step 2: Click "Create Account"',
            'Step 3: Fill out the "Create Account" form',
            'Step 4: Click "Create Account"',
            '',
            'The new account will be displayed in the "Chart of Accounts" page.'
          ] },
        { label: 'Editing an Account', 
          content: [
            'Step 1: Click the "View Accounts" button under the "Chart of Accounts" section of the home page',
            'Step 2: Click the "View" button next to the name of the account you"d like to edit',
            'Step 3: Click the "Options" button at the top of the page, then click "Edit"',
            'Step 4: The "Edit Account" form will appear. Make any desired changes, then click "Submit"',
            '',
            'Any changes made will be viewable from the "Chart of Accounts" page'
          ] },
      ]
    }
  ];

  expandedIndex = 0;

  constructor(private topNavService: TopNavService) {}

  ngOnInit(): void {
    this.topNavService.setTopNav({
      topNavHeader: 'Help',
      topNavIcon: PageIcon.help.toString()
    });
  }

  postDescript(): string{
    return "Bruh Im chanign this form this function in TS"
  }
}