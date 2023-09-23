import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CreateEditUserForm } from "src/app/shared/form/partials/create-edit-form";
import { passwordValidator, passwordsMatchValidator } from "src/app/shared/form/validators/password-validator";

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
        private router: Router,
        private route: ActivatedRoute){
    
    
      this.formControls.get('passwords')?.setValidators(passwordsMatchValidator())
    }


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
        }, {validators: passwordsMatchValidator}),
        role: [4, Validators.required],
        securityQuestionAnswer: [null, Validators.required]
      })

    async executeAction() {
        this.submitInProgress = true;
        const data = this.formControls.value as Partial<CreateEditUserForm>;
        this.formSubmitted.emit(data)        

        await this.action();
        
        this.router.navigate(['../view'], {relativeTo: this.route})

        this.submitInProgress = false;
    }

    

    cancel() {
        this.formControls.reset();
        this.router.navigate(['../view'], {relativeTo: this.route})
    }

    get passwordControls():boolean {
      const passwordsGroup = this.formControls.get('passwords');
      
      return (passwordsGroup?.errors?.['passwordMatchError'] && passwordsGroup.get('confirmPassword')?.dirty);
    }
    
}