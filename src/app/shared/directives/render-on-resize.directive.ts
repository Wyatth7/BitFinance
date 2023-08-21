import { Directive, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRenderOnResize]'
})
export class RenderOnResizeDirective implements OnInit {
  private _hasView: boolean = false;

  @Input() appRenderOnResize!: {showStart: number, showEnd: number}; 

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    ) { }

  @HostListener('window:resize', ['$event']) onWindowResized(event: any) {
    this.renderComponent(event);
  }

  ngOnInit(): void {
      this.renderComponent({target: { innerWidth: window.innerWidth }})
  }

  renderComponent(event: any) {
    const targetWidth = event.target.innerWidth;

    console.log(this.appRenderOnResize)

    if (targetWidth >= this.appRenderOnResize.showStart && targetWidth < this.appRenderOnResize.showEnd && !this._hasView) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this._hasView = true;
      console.log('show');
      
    } else if (targetWidth < this.appRenderOnResize.showStart || targetWidth >= this.appRenderOnResize.showEnd && this._hasView) {
      this.viewContainerRef.clear();
      this._hasView = false;
      console.log('no show');
      
    }
  }
}
