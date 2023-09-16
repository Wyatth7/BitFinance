import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditUserForm } from 'src/app/shared/form/partials/create-edit-form';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{
  formData!: Partial<CreateEditUserForm>;
  formValues!: UserModel;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.url[1].path;
      
    const user = this.userService.getUserFromStore(uid)

    if (!user) {
      this.router.navigateByUrl('/users/view')
      return;
    }

    this.formValues = user;
  }

  async editUserAction() {

  }

  formSubmitted(form: Partial<CreateEditUserForm>) {
    this.formData = form;
  }
}
