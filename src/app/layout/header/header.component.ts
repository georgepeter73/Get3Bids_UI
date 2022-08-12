import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/service/auth.service";
import { environment } from "@env";
import { Observable } from "rxjs";
import { ThemeService } from "app/core/service/theme.service";
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {Router} from '@angular/router';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {GlobalService} from '@app/service/global.service';


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
  user: any;
  username : string;
  items = [{ title: 'Admin', icon: 'settings-outline' }, { title: 'Log out',icon:'arrow-circle-left-outline' }];




  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private router: Router,
    private quickQuoteService : QuickQuoteService,
    private globalService : GlobalService


  ) {}

  async ngOnInit() {
    this.username = localStorage.getItem("user");
    this.items.push({title:this.authService.getUserFullName(),icon: 'person-outline'});
    this.isDarkTheme$ = this.themeService.getDarkTheme();
    this.themeService.setDarkTheme(true);
    this.getLoggedInUserDetails();
    this.nbMenuService
       .onItemClick()
       .subscribe(data => {
        if (data.item.title === 'Log out') {
           this.logout();
         }
         if (data.item.title === 'Admin') {
             this.router.navigate(["/admin/admin-dash"]);
         }

       });
    if(this.authService.isTokenExpired()){
      this.logout();
    }


  }
  getLoggedInUserDetails(){
    this.quickQuoteService.getUserByEmail(this.authService.getUserEmail()).subscribe(user =>{
      this.globalService.setLoggedInUser(user);
    })

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
