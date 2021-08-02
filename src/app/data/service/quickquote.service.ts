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





}
