import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/shared/models/users/user-model';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit{
  @Input() user!: UserModel

  suspendForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private userService: UserService) {}

  ngOnInit(): void {

    this.suspendForm = this.formBuilder.group({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null)
    });
      
  }

  async suspendUser() {

    const start = this.suspendForm.get('start')?.value;
    const end = this.suspendForm.get('end')?.value;

    if (!start || !end) return;

    const success = await this.userService.suspendUser(this.user.uid, start, end)
  
    if (success) {
      this.user.suspended = {
        start,
        end
      };
      this.suspendForm.reset();
    }
  }

  async unsuspendUser() {
    const success = await this.userService.unsuspendUser(this.user.uid)

    if (success) {
      this.user.suspended = null;
    }
  }

  async toggleActivation() {
    const success = await this.userService.toggleActivation(this.user.uid);

    if (success) {
      this.user.isActive = !this.user.isActive;
    }
  }
}
