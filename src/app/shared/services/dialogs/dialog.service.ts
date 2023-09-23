import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog/dialog-data';
import { ErrorComponent } from '../../components/dialogs/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open(component: any, data: DialogData){ 
    this.dialog.open(component, { data, maxWidth: '30rem' })
  }

  openErrorDialog(data: DialogData) {
    this.open(ErrorComponent, data);
  }
}
