import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-circle-image',
  templateUrl: './user-circle-image.component.html',
  styleUrls: ['./user-circle-image.component.scss']
})
export class UserCircleImageComponent {
  @Input() userInitials!: string;

}
