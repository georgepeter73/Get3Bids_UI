import { NgModule, Optional, SkipSelf } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthGuard } from "@app/guard/auth.guard";
import { throwIfAlreadyLoaded } from "@app/guard/module-import.guard";

import { TokenInterceptor } from "@app/interceptor/token.interceptor";

import { NgxSpinnerModule } from "ngx-spinner";
import {AdminGuard} from '@app/guard/admin.guard';
import {LockDeskGuard} from '@app/guard/lockdesk.guard';

@NgModule({
  imports: [HttpClientModule, NgxSpinnerModule],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    LockDeskGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
