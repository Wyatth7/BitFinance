import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../models/dialog/dialog-data";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-report-group',
  templateUrl: './create-report-group.component.html',
  styleUrls: ['./create-report-group.component.scss']
})
export class CreateReportGroupComponent {
  loading = false;

  form = new FormGroup({
    reportGroupName: new FormControl('', [Validators.required]),
    reportGroupDescription: new FormControl(''),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CreateReportGroupComponent>,
  ) {}

  async executeAction() {
    this.loading = true;
    console.log(this.form.value)
    // await  this.data.action();
    this.loading = false;

    this.dialogRef.close();
  }
}
