import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this.open(message, ['snack-styles--success']);
  }

  showError(message: string) {
    this.open(message, ['snack-styles--error'])
  }

  private open(message: string, panelClass: string[]) {
    this._snackBar.open(
      message,
      'Close',
      {
          duration: 3000,
          panelClass: [...panelClass]
      }
  )
  }
}
