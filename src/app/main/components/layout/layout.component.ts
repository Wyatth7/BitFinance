import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageLoadModel } from 'src/app/shared/models/page/page-load-model';
import { LoaderService } from 'src/app/shared/services/component-services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterContentChecked {
  pageIsLoading: PageLoadModel = {
    pageTitle: '',
    isLoading: false
  };

  private loaderSubscription!: Subscription;

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.loaderSubscription = this.loaderService
      .isLoading$
      .subscribe(isLoading => this.pageIsLoading = isLoading);
  }

  ngAfterContentChecked(): void {
      this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
      this.loaderSubscription.unsubscribe();
  }
}
