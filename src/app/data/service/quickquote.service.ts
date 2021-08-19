import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserMlo} from '@data/schema/user/user-mlo';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import { catchError } from "rxjs/operators";
import {UserMedia} from '@data/schema/user/user-media';

const API_URL = environment.API_URL;

@Injectable()
export class QuickQuoteService {
  private payload: string;
  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  constructor(
    private http: HttpClient
  ) {
  }

  public saveUserMLO(
    userMlo: UserMlo
  ): Observable<UserMlo> {

    return this.http
      .post(
        API_URL + '/api/v1/auth/add-user',
        JSON.stringify(userMlo),
        this.requestOptions
      )
      .pipe(map(result => this.gerUserMLO(<UserMlo>result)));
  }


  public getAllUserMLO(): Observable<UserMlo[]> {
    return this.http
      .get(API_URL + '/api/v1/auth/get-all-users'
      )
      .pipe(
        map(response => {
          return this.getUser(response);
        })
      )
  }


  public getUser(response: any): UserMlo[] {
    return (<UserMlo[]>response).map(
      user =>
        this.gerUserMLO(user)
    );
  }
  public gerUserMLO(user : UserMlo): UserMlo {
    let user1 = new UserMlo();
    user1.firstName = user['firstName'];
    user1.lastName = user['lastName'];
    user1.userName = user['userName'];
    user1.brokerCompanyId = user['brokerCompanyId'];
    user1.clientId = user['clientId'];
    user1.enterpriseId = user['enterpriseId'];
    user1.reportToUserId = user['reportToUserId'];
    user1.userUUID = user['userUUID'];
    user1.floifyTeamManagerFlag = user['floifyTeamManagerFlag'];
    user1.floifyTeamManagerId = user['floifyTeamManagerId'];
    user1.lastUpdatedAt = user['lastUpdatedAt'];
    user1.lastUpdatedBy = user['lastUpdatedBy'];
    user1.deleteFlag = user['deleteFlag'];
    user1.loPricingId = user['loPricingId'];
    user1.loMargin = user['loMargin'];
    user1.userId = user['userId'];
    user1.floifyAccountApprovalFlag = user['floifyAccountApprovalFlag'];
    return user1;
  }
  public uploadMedia(data: FormData): Observable<UserMedia> {
    return this.http
      .post(
        API_URL + "/api/v1/auth/upload-media",
        data
      )
      .pipe(
        map(response => {
          const userMedia = new UserMedia();
           userMedia.mediaUrl = response["mediaURL"];
           return userMedia;
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  public errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
      console.log(error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(error);
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }





}
