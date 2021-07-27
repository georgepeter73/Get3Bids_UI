import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "@app/guard/auth.guard";

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomepageLayoutComponent,
  //   pathMatch: 'full'
  // },
  {
    path: "",
    redirectTo: "/admin",
    pathMatch: "full"
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
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
  // Fallback when no prior routes is matched
  { path: "**", redirectTo: "/", pathMatch: "full" }
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
