import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MloPricingBreakupComponent } from './mlo-pricing-breakup.component';

describe('MloPricingBreakupComponent', () => {
  let component: MloPricingBreakupComponent;
  let fixture: ComponentFixture<MloPricingBreakupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MloPricingBreakupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MloPricingBreakupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
