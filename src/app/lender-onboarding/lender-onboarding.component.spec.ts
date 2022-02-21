import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderOnboardingComponent } from './lender-onboarding.component';

describe('LenderOnboardingComponent', () => {
  let component: LenderOnboardingComponent;
  let fixture: ComponentFixture<LenderOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
