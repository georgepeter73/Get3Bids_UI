import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "@app/guard/auth.guard";
import {LockdeskLayoutComponent} from './layout/lockdesk-layout/lockdesk-layout.component';
import {AdminGuard} from '@app/guard/admin.guard';
import {QuickpricerLayoutComponent} from './layout/quickpricer-layout/quickpricer-layout.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth",
    pathMatch: "full"
  },
  {
    path: 'home',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import('@modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard,AdminGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("@modules/admin/admin.module").then(m => m.AdminModule)
      }
    ]
  },

  {
    path: "auth",
    component: AuthLayoutComponent,
    loadChildren: () =>
      import("@modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "quickpricer",
    component: QuickpricerLayoutComponent,
    loadChildren: () =>
      import("@modules/quickpricer/quickpricer.module").then(m => m.QuickpricerModule)
  },


];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "top"
    })
  ],
  exports: [RouterModule],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class AppRoutingModule {}
