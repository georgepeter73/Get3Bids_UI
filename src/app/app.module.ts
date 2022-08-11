import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoreModule } from "@app/core.module";
import { SharedModule } from "@shared/shared.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";

import { AuthModule } from "@modules/auth/auth.module";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RecaptchaModule } from "ng-recaptcha";
import {
    NbThemeModule,
    NbActionsModule,
    NbLayoutModule,
    NbButtonModule,
    NbMenuModule,
    NbUserModule,
    NbContextMenuModule,
    NbSidebarModule,
    NbIconModule,
    NbStepperModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbToggleModule,
    NbAlertModule,
    NbRouteTabsetModule,
    NbDialogModule, NbSearchModule, NbAccordionModule, NbTabsetModule, NbTooltipModule
} from '@nebular/theme';
import { NbEvaIconsModule } from "@nebular/eva-icons";
import { CookieModule } from "ngx-cookie";
import {NoCacheHeadersInterceptor} from '@app/interceptor/nocacheheaders.interceptor';
import {NgxMaskModule} from 'ngx-mask';
import { LockdeskLayoutComponent } from './layout/lockdesk-layout/lockdesk-layout.component';
import { LockdeskHeaderComponent } from './layout/lockdesk-header/lockdesk-header.component';
import { LockdeskFooterComponent } from './layout/lockdesk-footer/lockdesk-footer.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app-state';
import { UserEffects } from './app-state/effects';
import { EffectsModule } from '@ngrx/effects';
import { QuickpricerLayoutComponent } from './layout/quickpricer-layout/quickpricer-layout.component';
import {RouterModule} from '@angular/router';
import {QuickQuoteService} from '@data/service/quickquote.service';


@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        HeaderComponent,
        FooterComponent,
        AuthLayoutComponent,
        LockdeskLayoutComponent,
        LockdeskHeaderComponent,
        LockdeskFooterComponent,
        QuickpricerLayoutComponent,




    ],
    imports: [
        // angular
        BrowserModule,
        HttpClientModule,

        // 3rd party
        NbLayoutModule,
        NbMenuModule.forRoot(),
        NbThemeModule.forRoot(),
        NbSidebarModule.forRoot(),
        NbDatepickerModule.forRoot(),
        NbActionsModule,
        NbUserModule,
        NbContextMenuModule,
        NbEvaIconsModule,
        NbIconModule,
        NbCardModule,
        NbStepperModule,
        NbInputModule,
        NbSelectModule,
        NbDatepickerModule,
        NbRadioModule,
        NbAlertModule,
        NbCheckboxModule,
        NbButtonModule,
        NbToggleModule,
        NbRouteTabsetModule,
        NbDialogModule.forRoot(),
        RecaptchaModule,

        // core & shared
        CoreModule,
        SharedModule,

        // app
        AuthModule,
        AppRoutingModule,

        BrowserAnimationsModule,
        CookieModule.forRoot(),
        NbSearchModule,
        NbAccordionModule,
        NbTabsetModule,
        NbTooltipModule,
        NgxMaskModule.forRoot(),
      // ngrx related imports
        StoreModule.forRoot(reducers, {
        metaReducers
       }),
       EffectsModule.forRoot([UserEffects]),




    ],
    providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true,

    }, QuickQuoteService
    ],
    exports: [
        FooterComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}
