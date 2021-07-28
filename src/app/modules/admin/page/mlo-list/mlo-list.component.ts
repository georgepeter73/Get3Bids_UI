import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mlo-list',
  templateUrl: './mlo-list.component.html',
  styleUrls: ['./mlo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MloListComponent implements OnInit {

  constructor() {
    console.log("test")

  }

  ngOnInit(): void {
    console.log("test")
  }

}
