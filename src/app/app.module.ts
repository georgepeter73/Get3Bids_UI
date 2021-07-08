import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from "./auth.guard";
import { APIService } from "./API.service";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  providers: [AuthGuard,APIService],
  bootstrap: [AppComponent]
})
export class AppModule {}
