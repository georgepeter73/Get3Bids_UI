import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserMlo} from '@data/schema/user/user-mlo';
import {NgForm} from '@angular/forms';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-mlo',
  templateUrl: './mlo.component.html',
  styleUrls: ['./mlo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloComponent implements OnInit {
  userMLO : UserMlo = new UserMlo();
  userMLOManager : UserMlo[] =[];
  loading: any;
  constructor(public quickQuoteService : QuickQuoteService, private _location: Location) {

  }
  ngOnInit(): void {
    this.quickQuoteService.getAllUserMLO().subscribe(response =>{
      this.userMLOManager = response.filter(u => u.floifyTeamManagerFlag === true)
    })

  }
  submitOrder(form: NgForm) {
    this.loading = true;
    this.quickQuoteService.saveUserMLO(this.userMLO).subscribe(res =>{
      this.userMLO = res;
      this.loading = false;
    },
      error => {
        this.loading = false;
      }
    )
  }

  backClicked($event: MouseEvent) {
    event.preventDefault();
    this._location.back();
  }
}
