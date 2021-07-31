import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {UserMlo} from '@data/schema/user/user-mlo';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
        this.payload,
        {
          params: new HttpParams()
            .set("userDTO", JSON.stringify(userMlo)),

        }
      )
      .pipe(map(result => <UserMlo>result));
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
        new UserMlo(
          user['firstName'],
          user['lastName'],
          user['userName'],
          user['brokerCompanyId'],
          user['clientId'],
          user['enterpriseId'],
          user['reportToUserId'],
          user['userUUID'],
          user['floifyTeamManagerFlag'],
          user['floifyTeamManagerId'],
          user['lastUpdatedAt'],
          user['lastUpdatedBy'],
          user['deleteFlag'],
          user['loPricingId'],
          user['loMargin'],
          user['userId'],
        )
    );
  }


}
