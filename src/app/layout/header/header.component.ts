import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/service/auth.service";
import { environment } from "@env";
import { Observable } from "rxjs";
import { ThemeService } from "app/core/service/theme.service";
import { NbMenuService, NbSidebarService } from "@nebular/theme";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public version = environment.version;
  public repoUrl = "";
  public isDarkTheme$: Observable<boolean>;
  public isAuthenticated = this.authService.getUser() !== null;
  public authUser: any;
  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  user: any;
  username : string;

  headerItems = [
    { link: "/quickquote/property-location", title: "Quick Quote" },
    { link: "/dashboard/home", title: "Dashboard" },
    { link: "/about", title: "About" },
    { link: "/contact", title: "Contact" }
  ];

  public nbContextMenuItems = [
    { title: "Profile", data: { id: "profile", link: "/profile" } },
    { title: "Log out", data: { id: "logout", link: "/auth/logout" } }
  ];

  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,

  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem("user");
    this.isDarkTheme$ = this.themeService.getDarkTheme();
    this.themeService.setDarkTheme(true);
    this.nbMenuService
       .onItemClick()
       .subscribe(data => {
        if (data.item.title === 'Log out') {
           this.logout();
         }
       });
    if(this.authService.isTokenExpired()){
      this.logout();
    }


  }


  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

  logout() {
      this.authService.logout("/auth/login");
  }

  toggleSidebar() {
    this.sidebarService.toggle(true, "left");
    return false;
  }
}
