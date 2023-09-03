import { Directive, HostListener, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRenderOnResize]'
})
export class RenderOnResizeDirective implements OnInit {
  private _isRendered: boolean = false;

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

    if (targetWidth >= this.appRenderOnResize.showStart && targetWidth < this.appRenderOnResize.showEnd && !this._isRendered) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this._isRendered = true;
      
    } else if (targetWidth < this.appRenderOnResize.showStart || targetWidth >= this.appRenderOnResize.showEnd && this._isRendered) {
      this.viewContainerRef.clear();
      this._isRendered = false;
    }
  }
}
