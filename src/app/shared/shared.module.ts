import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMasonryModule } from "ngx-masonry";
import {
  FontAwesomeModule,
  FaIconLibrary
} from "@fortawesome/angular-fontawesome";

import { faAsterisk, faUserCircle } from "@fortawesome/free-solid-svg-icons";

import { NgxMaskModule } from "ngx-mask";

import { ControlMessagesComponent } from "./component/control-messages/control-messages.component";
import { SpinnerComponent } from "./component/spinner/spinner.component";
import { AgmCoreModule } from "@agm/core";
import {NbCardModule} from '@nebular/theme';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    NgxMaskModule,
    NgbModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDonQOow4jOPJE-Ch129zQ0qpLEUceCXQ4"
    }),
    NbCardModule
  ],
  declarations: [ControlMessagesComponent, SpinnerComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    MaterialModule,

    NgbModule,
    FontAwesomeModule,
    NgxMasonryModule,
    NgxMaskModule,

    ControlMessagesComponent,
    SpinnerComponent,
    NbCardModule
  ]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faAsterisk);
    library.addIcons(faUserCircle);
  }
}
