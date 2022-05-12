import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lockdesk-footer',
  templateUrl: './lockdesk-footer.component.html',
  styleUrls: ['./lockdesk-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockdeskFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
