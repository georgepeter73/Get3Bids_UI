import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMediaComponent } from './company-media.component';

describe('CompanyMediaComponent', () => {
  let component: CompanyMediaComponent;
  let fixture: ComponentFixture<CompanyMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
