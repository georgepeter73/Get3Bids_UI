import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {LogSearch} from '@data/schema/log-search';

@Component({
  selector: 'app-log-search-detail',
  templateUrl: './log-search-detail.component.html',
  styleUrls: ['./log-search-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogSearchDetailComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,) {
  }
  logSearch : LogSearch;

  ngOnInit(): void {
   this.logSearch = JSON.parse(sessionStorage.getItem("LogSearchSelection"))
  }
  backClicked(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this._location.back();}
  copyToClipboard(text) {
    if(!text){text="No Data"}
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }

}
