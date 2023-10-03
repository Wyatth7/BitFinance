import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
  private formBuilder: FormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        general: this.formBuilder.group({
          accountName: ['', Validators.required],
          accountNumber: ['', Validators.required],
          description: ['', Validators.required],
          balance: ['', Validators.required],
        }),
        types: this.formBuilder.group({
          accountType: ['1', Validators.required],
          normalType: ['1', Validators.required],
          statementType: ['1', Validators.required],
        })
      })
  }

  async executeAction() {
    if (!this.data.action) return;

    await this.data.action(this.form.getRawValue());
  }
}
