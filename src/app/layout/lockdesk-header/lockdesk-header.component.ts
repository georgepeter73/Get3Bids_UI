import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {environment} from '@env';
import {Observable, Subject} from 'rxjs';
import {ThemeService} from '@app/service/theme.service';
import {AuthService} from '@app/service/auth.service';
import {NbMenuService, NbSidebarService} from '@nebular/theme';
import {Router} from '@angular/router';
import * as fromRoot from '../../app-state';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {User} from '../../app-state/entity';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {GlobalService} from '@app/service/global.service';

@Component({
  selector: 'app-lockdesk-header',
  templateUrl: './lockdesk-header.component.html',
  styleUrls: ['./lockdesk-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockdeskHeaderComponent implements OnInit {

  public version = environment.version;
  public repoUrl = "";
  public isDarkTheme$: Observable<boolean>;
  public isAuthenticated = this.authService.getUser() !== null;
  public authUser: any;
  user: any;
  username : string;
  items = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  user1: User;
  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private nbMenuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private router: Router,
    private readonly store: Store,
    private quickQuoteService : QuickQuoteService,
    private globalService : GlobalService


  ) {
    //state management implementation, need to replicate in all the places
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.user1 = data.user;
    });
  }

  async ngOnInit() {
     this.username = localStorage.getItem("user");
    this.items.push({title:this.user1.fullName,icon: 'person-outline'});
    if(this.authService.isLockDesk()){
      this.items.push({ title: 'Loan House Admin', icon: 'settings-outline' })
    }
    this.items.push({ title: 'Lock Desk Home', icon: 'home-outline' })
    this.items.push({ title: 'Log out',icon:'arrow-circle-left-outline' })
    this.isDarkTheme$ = this.themeService.getDarkTheme();
    this.themeService.setDarkTheme(true);
    this.nbMenuService
      .onItemClick()
      .subscribe(data => {
        if (data.item.title === 'Log out') {
          this.logout();
        }
        if (data.item.title === 'Lock Desk Home') {

          this.router.navigate(["/lockdesk/"]);
        }
        if (data.item.title === 'Loan House Admin') {
          this.router.navigate(["/admin/admin-dash"]);
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
