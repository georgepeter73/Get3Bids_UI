import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPricingBreakupComponent } from './company-pricing-breakup.component';

describe('CompanyPricingBreakupComponent', () => {
  let component: CompanyPricingBreakupComponent;
  let fixture: ComponentFixture<CompanyPricingBreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyPricingBreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyPricingBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
