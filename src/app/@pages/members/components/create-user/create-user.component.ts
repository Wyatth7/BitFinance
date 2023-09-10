import { Component } from '@angular/core';
import { CreateEditUserForm } from 'src/app/shared/form/partials/create-edit-form';
import { CreateUserModel } from 'src/app/shared/models/users/create-user-model';
import { SnackBarService } from 'src/app/shared/services/component-services/snack-bar.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  formData!: Partial<CreateEditUserForm>;
  
  constructor(private userService: UserService,
    private _snackBar: SnackBarService) { }
    
    async createUser() {
      console.log('creating user');
      
      try {
        const createUserModel: CreateUserModel = {
          firstName: this.formData.name?.firstName!,
          lastName: this.formData.name?.lastName!,
          email: this.formData?.email!,
          password: this.formData.passwords?.password!,
          role: +this.formData.role!,
          requested: false
        }
        
        await this.userService.createUser(createUserModel)
        
        this._snackBar.openSnackBar();
        
      } catch (error) {
        console.log(error);
        
      }
    }
    createUserFn = this.createUser.bind(this);
    
    updateForm(form: Partial<CreateEditUserForm>) {
      console.log(form);
      this.formData = form;
    }
  }
  