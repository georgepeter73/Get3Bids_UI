import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListComponent } from './media-list.component';
import {AgGridModule} from '@ag-grid-community/angular';
import {NbCardModule, NbIconModule} from '@nebular/theme';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router} from '@angular/router';

describe('MediaListComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [AgGridModule, NbCardModule,NbIconModule, FontAwesomeModule, FormsModule,HttpClientModule],
      declarations: [ MediaListComponent ],
      providers : [QuickQuoteService,HttpClient,{ provide : Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
    .compileComponents();
  }));

  /***beforeEach(() => {
    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });***/
});
