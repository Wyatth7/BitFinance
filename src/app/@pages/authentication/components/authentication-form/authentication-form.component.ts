import { Component, Input } from '@angular/core';
import { AuthenticationFormModel } from 'src/app/shared/models/members/form/authentication-form-model';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.scss']
})
export class AuthenticationFormComponent {

  @Input() formData!: AuthenticationFormModel;


  async executeFormAction(event: any): Promise<void> {
    event.preventDefault();

    if (!this.formData.form.valid) return;

    await this.formData.actionAsync();
  }
}
