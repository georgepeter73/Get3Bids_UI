import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMediaComponent } from './upload-media.component';
import {FormsModule} from '@angular/forms';
import {NbAlertModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {HttpClient} from '@angular/common/http';
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
        NbSpinnerModule
      ],
      declarations: [ UploadMediaComponent ],
      providers: [
        Location,
        HttpClient,
        QuickQuoteService,

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
