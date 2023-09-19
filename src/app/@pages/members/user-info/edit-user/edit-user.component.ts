import {  Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditUserForm } from 'src/app/shared/form/partials/create-edit-form';
import { passwordValidator, passwordsMatchValidator } from 'src/app/shared/form/validators/password-validator';
import { EditUserModel } from 'src/app/shared/models/users/edit-user-model';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  @Input() user!: UserModel;
  submitInProgress = false;
  formControls!: FormGroup<any>;


  constructor(private userService: UserService,
    private formBulider: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  async editUserAction() {
    // call update user FB function
    // If update success, update user in store.
    const nameControl = this.formControls.get('name');
    const email = this.formControls.get('email')?.value;
    const role = this.formControls.get('role')?.value;

    const updatedUser: EditUserModel = {
      uid: this.user.uid,
      email,
      role,
      firstName: nameControl?.get('firstName')?.value,
      lastName: nameControl?.get('lastName')?.value,
    }

    await this.userService.updateUser(updatedUser);
    // Do not reset the form.
  }

  createForm() {
    this.formControls = this.formBulider.group({
      name: this.formBulider.group({
        firstName: [this.user.firstName, [Validators.required]],
        lastName: [this.user.lastName, [Validators.required]]
      }),
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.user.role, Validators.required]
    });
  }
}
