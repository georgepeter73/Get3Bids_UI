import {Component, OnInit, ChangeDetectionStrategy, Inject, LOCALE_ID} from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {LogSearchDetails} from '@data/schema/log-search-details';

@Component({
  selector: 'app-log-search-selected-product',
  templateUrl: './log-search-selected-product.component.html',
  styleUrls: ['./log-search-selected-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LogSearchSelectedProductComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location, @Inject(LOCALE_ID) public locale: string) {
  }
  logSearchSelectedProduct : LogSearchDetails;

  ngOnInit(): void {
    this.logSearchSelectedProduct = JSON.parse(sessionStorage.getItem("LogSearchSelectedProduct"))
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
