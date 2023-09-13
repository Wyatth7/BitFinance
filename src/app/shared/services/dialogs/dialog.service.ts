import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog/dialog-data';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  open(component: any, data: DialogData){ 
    this.dialog.open(component, { data, maxWidth: '30rem' })
  }
}
