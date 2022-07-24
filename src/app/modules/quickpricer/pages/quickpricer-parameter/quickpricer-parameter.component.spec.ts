import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickpricerParameterComponent } from './quickpricer-parameter.component';

describe('QuickpricerParameterComponent', () => {
  let component: QuickpricerParameterComponent;
  let fixture: ComponentFixture<QuickpricerParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickpricerParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickpricerParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
