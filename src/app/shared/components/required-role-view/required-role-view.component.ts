import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Roles } from '../../enums/authentication/roles';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-required-role-view',
  templateUrl: './required-role-view.component.html',
  styleUrls: ['./required-role-view.component.scss']
})
export class RequiredRoleViewComponent implements OnInit {
  @Input() roles!: Roles[];
  @Output() hasRequiredRole = new EventEmitter<boolean>();
  renderContent: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
      if (this.roles.includes(this.authService.userRole) 
        || this.roles.length === 0) {
        this.renderContent = true;
        return;
      }
      
      this.renderContent = false;
      this.hasRequiredRole.emit(false);
  }
}
