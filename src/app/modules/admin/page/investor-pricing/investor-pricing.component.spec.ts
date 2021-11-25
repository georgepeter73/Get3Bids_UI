import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPricingComponent } from './investor-pricing.component';

describe('InvestorPricingComponent', () => {
  let component: InvestorPricingComponent;
  let fixture: ComponentFixture<InvestorPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorPricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
