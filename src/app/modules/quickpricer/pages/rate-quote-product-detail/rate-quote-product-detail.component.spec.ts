import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateQuoteProductDetailComponent } from './rate-quote-product-detail.component';

describe('RateQuoteProductDetailComponent', () => {
  let component: RateQuoteProductDetailComponent;
  let fixture: ComponentFixture<RateQuoteProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateQuoteProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateQuoteProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
