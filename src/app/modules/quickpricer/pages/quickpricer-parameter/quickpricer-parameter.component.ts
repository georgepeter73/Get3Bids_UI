import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {faUser,faDollarSign,faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quickpricer-parameter',
  templateUrl: './quickpricer-parameter.component.html',
  styleUrls: ['./quickpricer-parameter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickpricerParameterComponent implements OnInit {
faperson = faUser;
fadollar = faDollarSign;
faHome = faHome;
  constructor(private router: Router,
              private _location: Location,

  ) {
  }

  ngOnInit(): void {

  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }
}
