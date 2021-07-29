
import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MloComponent } from './mlo.component';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {
  NbAccordionModule, NbAlertModule, NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbInputModule, NbOptionComponent,
  NbRadioModule,
  NbRouteTabsetModule,
  NbSelectModule, NbSpinnerModule,
  NbTabsetModule
} from '@nebular/theme';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MloComponent
      ],
      imports: [FormsModule, NbAccordionModule, NbAlertModule, NbButtonModule,
        NbCardModule,
        NbCheckboxModule, NbInputModule, NbOptionComponent,
        NbRadioModule,
        NbRouteTabsetModule,
        NbSelectModule, NbSpinnerModule,
        NbTabsetModule],
      providers: [QuickQuoteService]
    }).compileComponents();
  }));

 /*** it('should create the app', async(() => {
    const fixture = TestBed.createComponent(MloComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));***/
});
