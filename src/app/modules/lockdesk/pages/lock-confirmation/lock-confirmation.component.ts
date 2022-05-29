import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';

@Component({
  selector: 'app-lock-confirmation',
  templateUrl: './lock-confirmation.component.html',
  styleUrls: ['./lock-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockConfirmationComponent implements OnInit {

  constructor(private route : ActivatedRoute,private lockDeskService : LockDeskService) { }
  private itemId = "";

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.lockDeskService.getLoanById(this.itemId).subscribe(i =>{
      alert(JSON.stringify(i));
    })
  }
}
