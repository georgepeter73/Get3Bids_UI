import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMediaComponent } from './upload-media.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbAlertModule, NbCardModule, NbIconModule, NbSpinnerModule} from '@nebular/theme';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {QuickQuoteService} from '@data/service/quickquote.service';

describe('UploadMediaComponent', () => {
  let component: UploadMediaComponent;
  let fixture: ComponentFixture<UploadMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NbCardModule,
        NbAlertModule,
        NbSpinnerModule,
        NbIconModule,
        ReactiveFormsModule,
        HttpClientModule
       ],
      declarations: [ UploadMediaComponent ],
      providers: [
        Location,
        HttpClient,
        QuickQuoteService,
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  /***beforeEach(() => {
    fixture = TestBed.createComponent(UploadMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });***/
});
