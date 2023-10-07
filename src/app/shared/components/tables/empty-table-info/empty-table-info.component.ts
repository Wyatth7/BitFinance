import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table-info',
  templateUrl: './empty-table-info.component.html',
  styleUrls: ['./empty-table-info.component.scss']
})
export class EmptyTableInfoComponent {

  @Input() headerText!: string;
  @Input() buttonText = '';
  @Input() requiredActionRoles?: number[];
  @Input() action?: () => void; 

  executeAction() { 
    if (!this.action) return;

    this.action();
  }
}
