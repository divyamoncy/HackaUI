import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorroweronboardingComponent } from './borroweronboarding.component';

describe('BorroweronboardingComponent', () => {
  let component: BorroweronboardingComponent;
  let fixture: ComponentFixture<BorroweronboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorroweronboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorroweronboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
