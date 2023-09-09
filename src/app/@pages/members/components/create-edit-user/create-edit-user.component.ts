import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { Roles } from "src/app/shared/enums/authentication/roles";
import { passwordValidator } from "src/app/shared/form/validators/password-validator";
import { CreateUserModel } from "src/app/shared/models/users/create-user-model";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
    selector: 'app-nav-member-total',
    templateUrl: './create-edit-user.component.html',
    styleUrls: ['./create-edit-user.component.scss']
  })
export class CreateEditUserComponent {
    submitInProgress = false;

    constructor(private formBulider: FormBuilder,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute){ }

    formControls = this.formBulider.group({
        name: this.formBulider.group({
          firstName: ['', [Validators.required]],
          lastName: ['', [Validators.required]]
        }),
        email: ['', [Validators.required, Validators.email]],
        passwords: this.formBulider.group({
          password: [
            '',
           [ Validators.required,
            Validators.minLength(8),
            passwordValidator()]
          ],
          confirmPassword: [
            '',
            [Validators.required,
            Validators.minLength(8),
            passwordValidator()]
          ],
        }),
        role: [4, Validators.required]
      })

    async createUser() {
        console.log(this.formControls);
        this.submitInProgress = true;

        try {
            const formValues = this.formControls.value;
            const createUserModel: CreateUserModel = {
                firstName: formValues.name?.firstName!,
                lastName: formValues.name?.lastName!,
                email: formValues?.email!,
                password: formValues.passwords?.password!,
                role: +formValues.role!,
                requested: false
            }

            await this.userService.createUser(createUserModel)
            this.formControls.reset();

            this.openSnackBar();

        } catch (error) {
            
        }

        this.submitInProgress = false;
    }  

    cancel() {
        this.formControls.reset();
        this.router.navigate(['../view'], {relativeTo: this.route})
    }

    private openSnackBar() {
        this._snackBar.open('User Create Successfully',
        'Close', {
            horizontalPosition: "center",
            verticalPosition: "bottom",
        })
    }
}