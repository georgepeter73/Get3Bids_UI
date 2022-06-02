import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';


@Component({
  selector: 'app-lock-confirmation',
  templateUrl: './lock-confirmation.component.html',
  styleUrls: ['./lock-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LockConfirmationComponent implements OnInit {

  constructor(private route : ActivatedRoute,private lockDeskService : LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) { }
  private itemId = "";
  loanInfo : LoanInfo;
  rateLockButtonLoading : false;

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      this.loanInfo = i;
      this.globalService.setRQSelectedLoanInfo(this.loanInfo);

    })
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  requestRateLock() {
    this.router.navigate(["/lockdesk/rate-quote-product/"+this.itemId]);


  }
}
