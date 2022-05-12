import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ThemeService} from '@app/service/theme.service';
import {NbMenuItem, NbMenuService, NbSidebarService} from '@nebular/theme';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-lockdesk-layout',
  templateUrl: './lockdesk-layout.component.html',
  styleUrls: ['./lockdesk-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockdeskLayoutComponent implements OnInit {
  isMobile: boolean;
  constructor(
    private themeService: ThemeService,
    private menuService: NbMenuService,
    private breakpointObserver: BreakpointObserver,
    private sidebarService: NbSidebarService
  ) {
    breakpointObserver.observe(["(max-width: 768px)"]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  public theme = "my-light-theme";
  menuItems: NbMenuItem[] = [
    {
      title: "Admin 1",
      link: "/admin/admin-1"
    },
    {
      title: "Admin 2",
      link: "/admin/admin-2"
    },
    {
      title: "Admin 3",
      link: "/admin/admin-3"
    },
    {
      title: "Admin 4",
      link: "/admin/admin-4"
    },
    {
      title: "Admin 5",
      link: "/admin/admin-5"
    }
  ];

  ngOnInit() {
    this.themeService.setDarkTheme(false);

    this.themeService.getDarkTheme().subscribe(theme => {
      this.theme = theme ? "my-dark-theme" : "my-light-theme";
    });
  }

  onActivate(event) {
    if (this.isMobile) this.sidebarService.collapse("left");
    this.menuItems = this.menuItems.map(menuItem => {
      return menuItem;
    });
  }

}
