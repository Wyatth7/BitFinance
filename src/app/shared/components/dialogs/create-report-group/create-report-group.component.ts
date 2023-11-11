import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../models/dialog/dialog-data";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateReportDto} from "../../../models/reports/dto/create-report-dto";

@Component({
  selector: 'app-create-report.ts-group',
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
    if (!this.data.action) return;

    this.loading = true;
    console.log(this.form.value)

    const data: CreateReportDto = {
      reportName: this.form.value.reportGroupName!,
      reportDescription: this.form.value.reportGroupDescription || undefined,
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate!
    }

    await this.data.action(data);

    this.loading = false;

    this.dialogRef.close();
  }
}
