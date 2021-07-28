import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MloListComponent } from './mlo-list.component';

describe('MloListComponent', () => {
  let component: MloListComponent;
  let fixture: ComponentFixture<MloListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MloListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MloListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
