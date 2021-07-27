import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mlo',
  templateUrl: './mlo.component.html',
  styleUrls: ['./mlo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MloComponent implements OnInit {



  ngOnInit(): void {
    console.log("testing")
  }

}
