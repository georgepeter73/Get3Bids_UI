import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickpricerProductComponent } from './quickpricer-product.component';

describe('QuickpricerProductComponent', () => {
  let component: QuickpricerProductComponent;
  let fixture: ComponentFixture<QuickpricerProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickpricerProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickpricerProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
