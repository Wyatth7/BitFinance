import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateEditUserForm } from "src/app/shared/form/partials/create-edit-form";
import { passwordValidator } from "src/app/shared/form/validators/password-validator";
import { SnackBarService } from "src/app/shared/services/component-services/snack-bar.service";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
    selector: 'app-create-edit-user',
    templateUrl: './create-edit-user.component.html',
    styleUrls: ['./create-edit-user.component.scss']
  })
export class CreateEditUserComponent {
    @Input() action!: () => Promise<void>;
    @Output() formSubmitted = new EventEmitter<Partial<CreateEditUserForm>>();

    submitInProgress = false;

    constructor(private formBulider: FormBuilder,
        private userService: UserService,
        private _snackBar: SnackBarService,
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

    async executeAction() {
        this.submitInProgress = true;
        const data = this.formControls.value as Partial<CreateEditUserForm>;
        this.formSubmitted.emit(data)        

        await this.action();
        
        this.formControls.reset();
        this.submitInProgress = false;
    }

    

    cancel() {
        this.formControls.reset();
        this.router.navigate(['../view'], {relativeTo: this.route})
    }

    
}