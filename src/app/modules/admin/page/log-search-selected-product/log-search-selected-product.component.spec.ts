import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSearchSelectedProductComponent } from './log-search-selected-product.component';

describe('LogSearchSelectedProductComponent', () => {
  let component: LogSearchSelectedProductComponent;
  let fixture: ComponentFixture<LogSearchSelectedProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSearchSelectedProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSearchSelectedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
