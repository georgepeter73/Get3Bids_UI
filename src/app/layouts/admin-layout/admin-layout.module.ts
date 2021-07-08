import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DynamoComponent } from "../../pages/dynamo/dynamo.component";
import { LambdaComponent } from "../../pages/lambda/lambda.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BootComponent } from "src/app/pages/boot/boot.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DynamoComponent,
    LambdaComponent,
    BootComponent,
  ]
})
export class AdminLayoutModule {}
