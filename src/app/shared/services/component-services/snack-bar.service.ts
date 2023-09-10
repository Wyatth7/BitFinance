import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar() {
    this._snackBar.open(
        'User Created Successfully',
        'Close',
        {
            duration: 3000,
            panelClass: ['snack-styles']
        }
    )
}
}
