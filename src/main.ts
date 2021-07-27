import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { environment, awsmobile } from "@env";
import { Amplify, Auth } from "aws-amplify";
Amplify.configure(awsmobile);
Auth.configure(awsmobile);
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
