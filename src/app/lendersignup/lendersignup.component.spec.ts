import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersignupComponent } from './lendersignup.component';

describe('LendersignupComponent', () => {
  let component: LendersignupComponent;
  let fixture: ComponentFixture<LendersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
