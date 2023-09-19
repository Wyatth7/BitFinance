import { Component } from '@angular/core';
import { PasswordModel } from 'src/app/shared/models/users/password-model';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {

  passwords: PasswordModel[] = [
    {
      password: 'test123',
      isActive: true
    },
    {
      password: 'asdf',
      isActive: false
    },
    {
      password: 'testfdasfdfa123',
      isActive: false
    },
    {
      password: 'asdfasdfafff',
      isActive: false
    },
    {
      password: 'jlkashdjfh',
      isActive: false
    },
  ]
}
