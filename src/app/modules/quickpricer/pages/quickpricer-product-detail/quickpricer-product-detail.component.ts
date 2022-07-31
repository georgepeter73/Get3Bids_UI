import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LockDeskService} from '@data/service/lockdesk.service';
import {Location} from '@angular/common';
import {GlobalService} from '@app/service/global.service';

@Component({
  selector: 'app-quickpricer-product-detail',
  templateUrl: './quickpricer-product-detail.component.html',
  styleUrls: ['./quickpricer-product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class QuickpricerProductDetailComponent implements OnInit {
  productLoading: false;

  constructor(private route: ActivatedRoute, private lockDeskService: LockDeskService, private router: Router,
              private _location: Location, private globalService: GlobalService,) {
  }
  productId: string;
  quoteId: string;
  searchId: string;

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.quoteId = this.route.snapshot.paramMap.get('quoteId');
    this.searchId = this.route.snapshot.paramMap.get('searchId');
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/quickpricer/quickpricer-product'])
  }

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
  }
}
