import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowersignupComponent } from './borrowersignup.component';

describe('BorrowersignupComponent', () => {
  let component: BorrowersignupComponent;
  let fixture: ComponentFixture<BorrowersignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowersignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowersignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
