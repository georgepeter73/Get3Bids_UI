import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorNewComponent } from './investor-new.component';

describe('InvestorNewComponent', () => {
  let component: InvestorNewComponent;
  let fixture: ComponentFixture<InvestorNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
