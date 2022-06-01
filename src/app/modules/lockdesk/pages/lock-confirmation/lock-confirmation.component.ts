import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lock-confirmation',
  templateUrl: './lock-confirmation.component.html',
  styleUrls: ['./lock-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LockConfirmationComponent implements OnInit {

  constructor(private route : ActivatedRoute,private lockDeskService : LockDeskService, private router: Router,
              private _location: Location) { }
  private itemId = "";
  loanInfo : LoanInfo;
  rateLockButtonLoading : false;

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      this.loanInfo = i;

    })
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  requestRateLock() {
    this.lockDeskService.getQuoteResults("123").subscribe(r =>{
      alert(JSON.stringify(r))
    })

  }
}
