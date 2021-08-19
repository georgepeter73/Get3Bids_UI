import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashComponent } from './admin-dash.component';
import {FormsModule} from '@angular/forms';
import {NbCardModule} from '@nebular/theme';

describe('AdminDashComponent', () => {
  let component: AdminDashComponent;
  let fixture: ComponentFixture<AdminDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
      ],
      declarations: [ AdminDashComponent ]
    })

    .compileComponents();
  }));

  /***beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });***/
});
