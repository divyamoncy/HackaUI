import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmoneyComponent } from './investmoney.component';

describe('InvestmoneyComponent', () => {
  let component: InvestmoneyComponent;
  let fixture: ComponentFixture<InvestmoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
