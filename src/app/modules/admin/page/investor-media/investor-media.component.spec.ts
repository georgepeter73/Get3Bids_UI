import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorMediaComponent } from './investor-media.component';

describe('InvestorMediaComponent', () => {
  let component: InvestorMediaComponent;
  let fixture: ComponentFixture<InvestorMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
