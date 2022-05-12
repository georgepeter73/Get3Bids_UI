import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockdeskHomeComponent } from './lockdesk-home.component';

describe('LockdeskHomeComponent', () => {
  let component: LockdeskHomeComponent;
  let fixture: ComponentFixture<LockdeskHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockdeskHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockdeskHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
