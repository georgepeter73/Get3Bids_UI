import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./page/login/login.component";
import { ForgotComponent } from "./page/forgot/forgot.component";
import { SharedModule } from "@shared/shared.module";

import { AuthRoutingModule } from "./auth.routing";
import { NbCardModule } from "@nebular/theme";
import { AmplifyUIAngularModule } from "@aws-amplify/ui-angular";

@NgModule({
  declarations: [LoginComponent, ForgotComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NbCardModule,
    AmplifyUIAngularModule
  ]
})
export class AuthModule {}
