import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserMlo} from '@data/schema/user/user-mlo';
import {NgForm} from '@angular/forms';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {environment} from '@env';

@Component({
  selector: 'app-mlo',
  templateUrl: './mlo.component.html',
  styleUrls: ['./mlo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloComponent implements OnInit {
  userMLO : UserMlo = new UserMlo();
  userMLOManager : UserMlo[] ;
  loading: any;
  crudType : string;
  buttonText: string;
  buttonPressed = false;
  errorMessage ="";
  frontendurl = environment.FRONT_END_URL;
  mloLink : string;

  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.crudType = this.route.snapshot.paramMap.get('crudType');
    if(this.crudType == 'edit') {
      this.userMLO = JSON.parse(sessionStorage.getItem("userDTO"));
      this.buttonText = "Update MLO";
      this.buttonPressed = false;
      this.mloLink = this.frontendurl+'/quickquote/borrower-info/'+this.userMLO.userUUID+'/website';
     }else{
      this.buttonText = "Create MLO"
      this.buttonPressed = false;
    }

    this.quickQuoteService.getAllUserMLO().subscribe(
      userList => {
        this.userMLOManager = userList.filter(u => u.floifyTeamManagerFlag = true);
        this.userMLOManager.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));

      },
      error => {
        console.log(error);
      }
    );
  }
  submitOrder(form: NgForm) {
    this.loading = true;
    this.buttonPressed = true;
    if(this.userMLO.floifyTeamManagerFlag){
      this.userMLO.floifyTeamManagerId = 0;
    }else{
      this.userMLO.reportToUserId = this.userMLO.floifyTeamManagerId;
    }
    this.quickQuoteService.saveUserMLO(this.userMLO).subscribe(res =>{
      this.userMLO = res;
      this.mloLink = this.frontendurl+'/quickquote/borrower-info/'+this.userMLO.userUUID+'/website';
      this.loading = false;
      if(this.userMLO.userId>0){
        this.buttonText = "Update MLO"
      }
    },
      error => {
        this.loading = false;
        this.errorMessage = JSON.stringify(error);

      }
    );



  }

  backClicked($event: MouseEvent) {
    event.preventDefault();
    this._location.back();
  }
   copyToClipboard(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  }
}
