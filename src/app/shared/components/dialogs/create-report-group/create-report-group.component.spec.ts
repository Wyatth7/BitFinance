import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportGroupComponent } from './create-report-group.component';

describe('CreateReportGroupComponent', () => {
  let component: CreateReportGroupComponent;
  let fixture: ComponentFixture<CreateReportGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateReportGroupComponent]
    });
    fixture = TestBed.createComponent(CreateReportGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
