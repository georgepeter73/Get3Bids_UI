import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDashComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  mlo() {
    this.router.navigate(["/admin/mlo-list"]);
  }

  media() {
    this.router.navigate(["/admin/upload-media"]);
  }
}
