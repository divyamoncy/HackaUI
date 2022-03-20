import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderdashboardComponent } from './lenderdashboard.component';

describe('LenderdashboardComponent', () => {
  let component: LenderdashboardComponent;
  let fixture: ComponentFixture<LenderdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LenderdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
