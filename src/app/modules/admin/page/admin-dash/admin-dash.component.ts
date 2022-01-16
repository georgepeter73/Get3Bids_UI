import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    //nothing
  }

  mlo() {
    this.router.navigate(["/admin/mlo-list"]);
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
}
