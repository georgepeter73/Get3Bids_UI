import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserMlo} from '@data/schema/user/user-mlo';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserMedia} from '@data/schema/user/user-media';
import {UserMloPricing} from '@data/schema/user/user-mlo-pricing';

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
        API_URL + '/api/v1/auth/save-user-mlo',
        JSON.stringify(userMlo),
        this.requestOptions
      )
      .pipe(map(result => <UserMlo>result));
  }


  public getAllUserMLO(): Observable<UserMlo[]> {
    return this.http
      .get(API_URL + '/api/v1/auth/get-all-user-mlo'
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
          (<UserMedia[]>response['userMedia']).map(
            userMedia =>
              new UserMedia(
                userMedia['userMediaId'],
                userMedia['userId'],
                userMedia['mediaUrl'],
                userMedia['mediaType'],
                userMedia['mediaDescription'],
                userMedia['lastUpdatedAt'],
                userMedia['lastUpdatedBy'],
                userMedia['deleteFlag'],
              )
          ),
          (response['userMedia']).pipe.map(
            userMLOPricing => {
              return new UserMloPricing(
                userMLOPricing['status'],
                userMLOPricing['transaction'],
                userMLOPricing['message'],
                userMLOPricing['status_description']
              )
            }
          ),
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
        )
    );
  }


}
