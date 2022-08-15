import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@app/service/auth.service';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {GlobalService} from '@app/service/global.service';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashComponent implements OnInit {
  constructor(private router: Router,  public authService: AuthService, private quickQuoteService : QuickQuoteService,
              private globalService : GlobalService) {

  }
  loadingUser = false;

  ngOnInit(): void {
    if(!this.globalService.getLoggedInUser()) {
      this.getLoggedInUserDetails();
    }
  }
  mlo() {
    this.router.navigate(["/admin/mlo-list/0"]);
  }

  media() {
    this.router.navigate(["/admin/media-list"]);
  }
  investorPricing(){
    this.router.navigate(["/admin/investor-pricing"]);
  }
  logSearch(){
    this.router.navigate(["/admin/log-search"]);
  }

  brokerCompany() {
    this.router.navigate(["/admin/company-list"]);
  }

  lockDesk() {
    this.router.navigate(["/lockdesk"]);
  }

  quickPricer() {
    this.router.navigate(["/quickpricer"]);
  }
  getLoggedInUserDetails(){
    this.loadingUser = true;
     this.quickQuoteService.getUserByEmail(this.authService.getUserEmail()).subscribe(user =>{
      this.globalService.setLoggedInUser(user);
       this.loadingUser = false;
    })

  }
}
