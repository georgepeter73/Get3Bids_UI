import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserMlo} from '@data/schema/user/user-mlo';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UserMedia} from '@data/schema/user/user-media';
import {MediaLocation} from '@data/schema/user/media-location';
import {UserContact} from '@data/schema/user/user-contact';
import {LoSiteDTO} from '@data/schema/user/lo-site';
import {InvestorPricing} from '@data/schema/investorpricing';
import {NewInvestor} from '@data/schema/new-investor';
import {LogSearch} from '@data/schema/log-search';
import {LogSearchComponent} from '@modules/admin/page/log-search/log-search.component';

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
  public getAllMediaLocation(): Observable<MediaLocation[]> {
     return this.http
      .get(API_URL + '/api/v1/auth/get-all-media-location'
      )
      .pipe(
        map(response => {
          return this.getMediaLocations(response);
        })
      )
  }
  public getMediaLocationByFormatType(formatType : string): Observable<MediaLocation[]> {
    return this.http
      .get(API_URL + '/api/v1/auth/get-media-location-by-format-type?formatType=' + formatType
      )
      .pipe(
        map(response => {
          return this.getMediaLocations(response);
        })
      )
  }


  public getMediaLocations(response: any): MediaLocation[] {
    return (<MediaLocation[]>response).map(
      mediaLoc =>
        this.getMediaLocation(mediaLoc)
    );
  }
  public getMediaLocation(mediaLoc : MediaLocation): MediaLocation {
    let mediaLocation = new MediaLocation();
    mediaLocation.mediaId = mediaLoc['mediaId'];
    mediaLocation.mediaURL = mediaLoc['mediaURL'];
    mediaLocation.mediaDescription = mediaLoc['mediaDescription'];
    mediaLocation.formatType = mediaLoc['formatType'];
    mediaLocation.deleteFlag = mediaLoc['deleteFlag'];
    mediaLocation.lastUpdatedAt = mediaLoc['lastUpdatedAt'];
    mediaLocation.lastUpdatedBy = mediaLoc['lastUpdatedBy'];
    return mediaLocation;
  }


  public getUser(response: any): UserMlo[] {
    return (<UserMlo[]>response).map(
      user =>
        this.gerUserMLO(user)
    );
  }
  public getLOSite(losite : LoSiteDTO){
    const loSiteLocal = new LoSiteDTO();
    if(losite) {
      loSiteLocal.loSiteId = losite['loSiteId'];
      loSiteLocal.siteType = losite['siteType'];
      loSiteLocal.deleteFlag = losite['deleteFlag'];
      loSiteLocal.floifyAPIKey = losite['floifyAPIKey'];
      loSiteLocal.lastUpdatedBy = losite['lastUpdatedBy'];
    }
   return loSiteLocal;
  }
  public getUserContact(userCon: UserContact): UserContact{
    const userContact = new UserContact();
    userContact.contactId = userCon['contactId'];
    userContact.contactInfoBcc = userCon['contactInfoBcc'];
    userContact.phoneWork = userCon['phoneWork'];
    userContact.phoneMobile = userCon['phoneMobile'];
    userContact.lastUpdatedBy = userCon['lastUpdatedBy'];
    return userContact;
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
    user1.userMediaList = this.getUserMedias(user['userMediaDTOList']);
    user1.userContact = this.getUserContact(user['userContact']);
    user1.loSiteDTO = this.getLOSite(user['loSiteDTO'])
    return user1;
  }
  public uploadMedia(data: FormData): Observable<MediaLocation> {
    return this.http
      .post(
        API_URL + "/api/v1/auth/upload-media",
        data
      )
      .pipe(
        map(response => {
             return this.getMediaLocation(<MediaLocation>response);
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
  public getUserMediaByUserId(userId : string): Observable<UserMedia[]>{
     return this.http
      .get(API_URL + '/api/v1/auth/get-all-media-by-userid?userId=' + userId
      )
      .pipe(
        map(response => {
          return this.getUserMedias(response);
        })
      ).pipe(catchError(this.errorHandler));
  }
  public getUserMedias(response: any): UserMedia[] {
     return (<UserMedia[]>response).map(
      userMedia =>
        this.gerUserMedia(userMedia)
    );
  }

  public gerUserMedia(userM : UserMedia): UserMedia {
    const userMedia = new UserMedia();
    userMedia.userMediaId = userM['userMediaId'];
    userMedia.userId = userM['userId'];
    userMedia.mediaURL = userM['mediaURL'];
    userMedia.mediaType = userM['mediaType'];
    userMedia.mediaDescription = userM['mediaDescription'];
    userMedia.lastUpdatedAt = userM['lastUpdatedAt'];
    userMedia.lastUpdatedBy = userM['lastUpdatedBy'];
    userMedia.deleteFlag = userM['deleteFlag'];
    userMedia.mediaId = userM['mediaId'];
    return userMedia;
  }
  public saveUserMedia(userMedia: UserMedia): Observable<UserMedia> {
    return this.http
      .post(
        API_URL + "/api/v1/auth/save-user-media",
        JSON.stringify(userMedia), this.requestOptions
      )
      .pipe(
        map(response => {
          return this.gerUserMedia(<UserMedia>response)
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  public deleteMediaLocation(mediaId: number): Observable<MediaLocation> {
    return this.http
      .get(
        API_URL + "/api/v1/auth/delete-media-location?mediaId="+mediaId

      )
      .pipe(
        map(response => {
          return this.getMediaLocation(<MediaLocation>response)
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  public getAllInvestorPricing(): Observable<InvestorPricing[]>{
    return this.http
      .get(API_URL + '/api/v1/auth/get-all-investor-pricing'
      )
      .pipe(
        map(response => {
          return this.getInvestorPricingList(response);
        })
      ).pipe(catchError(this.errorHandler));
  }
  public getInvestorPricingList(response: any): InvestorPricing[] {
    return (<InvestorPricing[]>response).map(
      pricing =>
        this.getInvestorPricingSingle(pricing)
    );
  }

  public getInvestorPricingSingle(investorPricing : InvestorPricing): InvestorPricing {
    const pricing = new InvestorPricing();
    pricing.investorPricingId = investorPricing['investorPricingId'];
    pricing.investorId = investorPricing['investorId'];
    pricing.lastUpdatedBy = investorPricing['lastUpdatedBy'];
    pricing.investorMargin = investorPricing['investorMargin'];
    pricing.loanType = investorPricing['loanType'];
    pricing.lastUpdatedAt = investorPricing['lastUpdatedAt'];
    pricing.loMargin = investorPricing['loMargin'];
    return pricing;
  }

  public saveInvestorPricing(
    investorPricing: InvestorPricing[]
  ): Observable<InvestorPricing[]> {

    return this.http
      .post(
        API_URL + '/api/v1/auth/save-all-investor-pricing',
        JSON.stringify(investorPricing),
        this.requestOptions
      )
      .pipe(map(result => this.getInvestorPricingList(result)));
  }
  public saveNewInvestor(newInvestor : NewInvestor): Observable<Object> {
    return this.http
      .post(
        API_URL + '/api/v1/auth/save-new-investor-pricing',
        JSON.stringify(newInvestor),
        this.requestOptions
      )
      .pipe();
  }
  public getUserMLOPricing(userUUID:string): Observable<InvestorPricing[]>{
    return this.http
      .get(API_URL + '/api/v1/auth/get-lo-pricing?userUUID=' + userUUID
      )
      .pipe(
        map(response => {
          return this.getInvestorPricingList(response);
        })
      ).pipe(catchError(this.errorHandler));
  }
  public getLogSearchEntity(lSearch : LogSearch): LogSearch {
    const logSearch = new LogSearch();
    logSearch.quoteId = lSearch['quoteId'];
    logSearch.products = lSearch['products'];
    logSearch.productsBadResponse = lSearch['productsBadResponse'];
    logSearch.quoteRequest = lSearch['quoteRequest'];
    logSearch.ineligibleProducts = lSearch['ineligibleProducts'];
    logSearch.loanId = lSearch['loanId'];
    logSearch.prospectsId = lSearch['prospectsId'];
    logSearch.floifyRequestData = lSearch['floifyRequestData'];
    logSearch.floifyResponseData = lSearch['floifyResponseData'];
    logSearch.firstName = lSearch['firstName'];
    logSearch.lastName = lSearch['lastName'];
    logSearch.middleName = lSearch['middleName'];
    logSearch.suffixName = lSearch['suffixName'];
    logSearch.email = lSearch['email'];
    logSearch.phone = lSearch['phone'];
    return logSearch;
  }
  public searchLog(): Observable<LogSearch[]> {
    return this.http
      .get(
        API_URL + '/api/v1/auth/search-log',
      )
      .pipe(map(result => this.getLogSearchList(result)));
  }
  public getLogSearchList(response: any): LogSearch[] {
    return (<LogSearch[]>response).map(
      logs =>
        this.getLogSearchEntity(logs)
    );
  }
}
