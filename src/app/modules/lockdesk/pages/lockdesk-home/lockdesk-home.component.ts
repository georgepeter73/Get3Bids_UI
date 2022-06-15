import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '@app/service/auth.service';
import {GlobalService} from '@app/service/global.service';
@Component({
  selector: 'app-lockdesk-home',
  templateUrl: './lockdesk-home.component.html',
  styleUrls: ['./lockdesk-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockdeskHomeComponent implements OnInit {

  constructor(private router: Router, private _location: Location, private authService: AuthService,public globalService: GlobalService,) { }

  ngOnInit(): void {
    this.loadGroups();
  }

  loanPipeline() {
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  lockLoanPipeline() {
    this.router.navigate(["/lockdesk/lock-loan-pipeline"]);
  }
  loadGroups() {

    //based on the logged in users groups set the group
    if (this.authService.getGroups().filter(g => g == 'lockdesk').length>0) {
      this.globalService.setIsLockDesk(true);
    }else{
      this.globalService.setIsLockDesk(false);
    }
  }
}
