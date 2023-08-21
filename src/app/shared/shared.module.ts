import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryTopNavComponent } from './components/secondary-top-nav/secondary-top-nav.component';
import { UserCircleImageComponent } from './components/user/user-circle-image/user-circle-image.component';
import { RenderOnResizeDirective } from './directives/render-on-resize.directive';



@NgModule({
  declarations: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SecondaryTopNavComponent,
    UserCircleImageComponent,
    RenderOnResizeDirective
  ]
})
export class SharedModule { }
