import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lock-confirmation',
  templateUrl: './lock-confirmation.component.html',
  styleUrls: ['./lock-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockConfirmationComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }
  private loanId = "";

  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('loanId');

  }

}
