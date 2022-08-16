import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AuthService} from '@app/service/auth.service';
import {GlobalService} from '@app/service/global.service';
import {QuickQuoteService} from '@data/service/quickquote.service';
@Component({
  selector: 'app-lockdesk-home',
  templateUrl: './lockdesk-home.component.html',
  styleUrls: ['./lockdesk-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LockdeskHomeComponent implements OnInit {

  constructor(private router: Router, private _location: Location, public authService: AuthService,public globalService: GlobalService, private quickQuoteService: QuickQuoteService) { }
  loadingUser = false;
  ngOnInit(): void {
    this.loadGroups();
    if(!this.globalService.getLoggedInUser()) {
      this.getLoggedInUserDetails();
    }else if(this.IsUserDifferent()){
      this.getLoggedInUserDetails();
    }
   }
  IsUserDifferent(){
    if(this.authService.getUserEmail() !== this.globalService.getLoggedInUser().userName){
      return true;
    }else{
      return false;
    }

  }
  emitEvent(){
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }
  refreshGrid($event: MouseEvent) {
    $event.preventDefault();

  }
  eventFire(el, etype){
    if(el) {
      if (el.fireEvent) {
        el.fireEvent('on' + etype);
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
  }

  loanPipeline() {
    this.router.navigate(["/lockdesk/loan-pipeline"]);
  }

  lockLoanPipeline() {
    this.router.navigate(["/lockdesk/lock-loan-pipeline"]);
  }
  loadGroups() {

    //based on the logged in users groups set the group
    if (this.authService.getGroups().filter(g => g == 'lockdesk').length>0) {
      this.globalService.setIsLockDesk(true);
    }else{
      this.globalService.setIsLockDesk(false);
    }

    if (this.authService.getGroups().filter(g => g === 'lockdesk_limited').length>0) {
      this.globalService.setIsLockDeskLimited(true)
    }else{
      this.globalService.setIsLockDeskLimited(false);
    }
    if (this.authService.getGroups().filter(g => g === 'mlo').length>0) {
      this.globalService.setIsMLO(true)
    }else{
      this.globalService.setIsMLO(false);
    }

  }

  adminDash() {
    this.router.navigate(["/admin/admin-dash"]);
  }

  quickPricer() {
    this.router.navigate(["/quickpricer/params"]);
  }
  getLoggedInUserDetails(){
    this.loadingUser = true;
    this.quickQuoteService.getUserByEmail(this.authService.getUserEmail()).subscribe(user =>{
      this.globalService.setLoggedInUser(user);
      this.loadingUser = false;
      this.emitEvent();
    })

  }
}
