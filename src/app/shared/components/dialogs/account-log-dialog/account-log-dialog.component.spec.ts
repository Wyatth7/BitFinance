import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLogDialogComponent } from './account-log-dialog.component';

describe('AccountLogDialogComponent', () => {
  let component: AccountLogDialogComponent;
  let fixture: ComponentFixture<AccountLogDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLogDialogComponent]
    });
    fixture = TestBed.createComponent(AccountLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
