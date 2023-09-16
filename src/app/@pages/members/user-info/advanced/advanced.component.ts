import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit{

  suspended = false;
  suspendForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.suspendForm = this.formBuilder.group({
      start: new FormControl([new Date(), Validators.required]),
      end: new FormControl(['', Validators.required])
    });
      
  }

}
