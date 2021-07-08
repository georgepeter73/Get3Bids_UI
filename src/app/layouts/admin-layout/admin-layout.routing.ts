import { Routes } from "@angular/router";
import { BootComponent } from "src/app/pages/boot/boot.component";

import { DynamoComponent } from "../../pages/dynamo/dynamo.component";
import { LambdaComponent } from "../../pages/lambda/lambda.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dynamo", component: DynamoComponent },
  { path: "boot", component: BootComponent },
  { path: "lambda", component: LambdaComponent }
];
