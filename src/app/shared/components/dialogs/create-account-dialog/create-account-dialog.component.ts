import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateAccountForm } from 'src/app/shared/form/partials/account-create-form';
import { DialogData } from 'src/app/shared/models/dialog/dialog-data';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss']
})
export class CreateAccountDialogComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private formBuilder: FormBuilder,
    ) {}


  ngOnInit(): void {
    const formData = this.data.data as CreateAccountForm;
    
    this.form = this.formBuilder.group({
      general: this.formBuilder.group({
        accountName: [formData?.general?.accountName || '',
         Validators.required],
        accountNumber: [formData?.general?.accountNumber ||'',
         Validators.required],
        description: [formData?.general?.description || '',
         Validators.required],
        balance: [formData?.general?.balance || 0,
         Validators.required],
      }),
      types: this.formBuilder.group({
        accountType: [formData?.types?.accountType || 1,
         Validators.required],
         accountSubType: [formData?.types?.accountSubType || 1,
          Validators.required],
        normalType: [formData?.types?.normalType || 1,
         Validators.required],
        statementType: [formData?.types?.statementType || 1,
         Validators.required],
      })
    })
  }

  async executeAction() {
    if (!this.data.action) return;

    this.loading = true;

    await this.data.action(this.form.getRawValue());

    this.dialogRef.close();

    this.loading = false;
  }
}
