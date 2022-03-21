import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrepaymentComponent } from './create-prepayment.component';

describe('CreatePrepaymentComponent', () => {
  let component: CreatePrepaymentComponent;
  let fixture: ComponentFixture<CreatePrepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePrepaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
