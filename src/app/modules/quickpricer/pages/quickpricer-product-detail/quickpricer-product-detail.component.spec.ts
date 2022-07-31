import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickpricerProductDetailComponent } from './quickpricer-product-detail.component';

describe('QuickpricerProductDetailComponent', () => {
  let component: QuickpricerProductDetailComponent;
  let fixture: ComponentFixture<QuickpricerProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickpricerProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickpricerProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
