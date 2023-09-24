import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-loading-screen',
  templateUrl: './content-loading-screen.component.html',
  styleUrls: ['./content-loading-screen.component.scss']
})
export class ContentLoadingScreenComponent{

  @Input() loadingText = 'Page';
  
}
