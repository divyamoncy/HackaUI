import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderonboardingComponent } from './lenderonboarding.component';

describe('LenderonboardingComponent', () => {
  let component: LenderonboardingComponent;
  let fixture: ComponentFixture<LenderonboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderonboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
