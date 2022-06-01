import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateQuoteProductComponent } from './rate-quote-product.component';

describe('RateQuoteProductComponent', () => {
  let component: RateQuoteProductComponent;
  let fixture: ComponentFixture<RateQuoteProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateQuoteProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateQuoteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
