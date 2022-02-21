import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationOnboardingComponent } from './organisation-onboarding.component';

describe('OrganisationOnboardingComponent', () => {
  let component: OrganisationOnboardingComponent;
  let fixture: ComponentFixture<OrganisationOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
