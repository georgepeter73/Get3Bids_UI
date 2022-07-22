import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../app-state';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {User} from '../../../../app-state/entity';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  user: User;
  constructor(private router: Router, private readonly store: Store) {

    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.user = data.user;
     });

  }

  ngOnInit(): void {

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
}
