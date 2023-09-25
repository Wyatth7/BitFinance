import { Component } from '@angular/core';
import { ErrorComponent } from 'src/app/shared/components/dialogs/error/error.component';
import { CreateEditUserForm } from 'src/app/shared/form/partials/create-edit-form';
import { CreateUserModel } from 'src/app/shared/models/users/create-user-model';
import { SnackBarService } from 'src/app/shared/services/component-services/snack-bar.service';
import { DialogService } from 'src/app/shared/services/dialogs/dialog.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  formData!: Partial<CreateEditUserForm>;
  
  constructor(private userService: UserService,
    private _snackBar: SnackBarService,
    private dialog: DialogService) { }
    
    async createUser() {
      
      try {
        const createUserModel: CreateUserModel = {
          firstName: this.formData.name?.firstName!,
          lastName: this.formData.name?.lastName!,
          email: this.formData?.email!,
          password: this.formData.passwords?.password!,
          role: +this.formData.role!,
          requested: false,
          securityQuestionAnswer: this.formData.securityQuestionAnswer!
        }
        
        const userCreated = await this.userService.createUser(createUserModel)
        
        if (!userCreated) throw new Error();

        this._snackBar.showSuccess('User Created Successfully');
        
      } catch (error) {
        console.log(error);
        
        this.dialog.open(ErrorComponent, {
          title: 'User Creation Failed',
          data: 'There was an error when attempting to create a user. This may have occurred due to attempting to create a user that already exists.'
        })
      }
    }
    createUserFn = this.createUser.bind(this);
    
    updateForm(form: Partial<CreateEditUserForm>) {
      console.log(form);
      this.formData = form;
    }
  }
  