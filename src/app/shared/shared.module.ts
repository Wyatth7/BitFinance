import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryTopNavComponent } from './components/secondary-top-nav/secondary-top-nav.component';



@NgModule({
  declarations: [
    SecondaryTopNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecondaryTopNavComponent
  ]
})
export class SharedModule { }
