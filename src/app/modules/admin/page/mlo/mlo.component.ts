import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserMlo} from '@data/schema/user/user-mlo';
import {NgForm} from '@angular/forms';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
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
  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.crudType = this.route.snapshot.paramMap.get('crudType');
    if(this.crudType == 'edit') {
      this.userMLO = JSON.parse(sessionStorage.getItem("userDTO"));
      this.buttonText = "Edit MLO";
      this.buttonPressed = false;
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
       this.loading = false;
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
}
