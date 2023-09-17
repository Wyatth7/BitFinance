import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user!: UserModel;

  constructor (private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    const uid = this.route.snapshot.url[1].path;
      
    const user = this.userService.getUserFromStore(uid)
  
    if (!user) {
      this.router.navigateByUrl('/users/view')
      return;
    }

    this.user = user;
  }
}
