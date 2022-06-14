import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-lockdesk-home',
  templateUrl: './lockdesk-home.component.html',
  styleUrls: ['./lockdesk-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockdeskHomeComponent implements OnInit {

  constructor(private router: Router, private _location: Location) { }

  ngOnInit(): void {
  }

  loanPipeline() {
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  lockLoanPipeline() {
    this.router.navigate(["/lockdesk/lock-loan-pipeline"]);
  }
}
