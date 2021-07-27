import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MloComponent } from './mlo.component';

describe('MloComponent', () => {
  let component: MloComponent;
  let fixture: ComponentFixture<MloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
