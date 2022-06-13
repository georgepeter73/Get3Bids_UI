import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Borrower} from '@data/schema/lockdesk/borrower';
import {Purpose} from '@data/schema/lockdesk/purpose';
import {LoanType} from '@data/schema/lockdesk/loantype';
import {SubjectPropertyAddress} from '@data/schema/lockdesk/subject-property-address';
import {Occupancy} from '@data/schema/lockdesk/occupancy';
import {Coborrower} from '@data/schema/lockdesk/coborrower';
import {LoanOfficer} from '@data/schema/lockdesk/loan-officer';
import {PropertyType} from '@data/schema/lockdesk/property-type';
import {LoanStatus} from '@data/schema/lockdesk/loan-status';
import {QuickQuoteResultsRoot} from '@data/schema/lockdesk/quick-quote-results-root';
import {ProductDetailRoot} from '@data/schema/lockdesk/product-detail-root';
import {LockLoan} from '@data/schema/lockdesk/lock-loan';
import {UserContact} from '@data/schema/user/user-contact';
import {UserMlo} from '@data/schema/user/user-mlo';
import {LockLoanConfirmation} from '@data/schema/lockdesk/lock-loanconfirmation';
const API_URL = environment.LOCKDESK_API_URL;

@Injectable()
export class LockDeskService {
  private payload: string;
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    };
  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };

  constructor(
    private http: HttpClient
  ) {
  }
  public getLoanPipeline(mloEmail : string): Observable<LoanInfo[]> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_loan_pipeline?mloEmail=' + mloEmail, this.requestOptions
      )
      .pipe(
        map(response => {
           return this.getLoanInfos(response);
        })
      )
  }
  private getLoanInfos(response: any): LoanInfo[] {
    return (<LoanInfo[]>response).map(
      user =>
        this.getLoanInfo(user)
    );
  }
  private getLoanInfo(info : LoanInfo): LoanInfo {
    let loanInfo = new LoanInfo();
    loanInfo.loanId = info['loanId'];
    loanInfo.id = info['id'];
    loanInfo.loanNumber = info['loanNumber'];
    loanInfo.borrower = this.getBorrower(info['borrower'])
    loanInfo.loanAmount = info['loanAmount'];
    loanInfo.appraisalValue = info['appraisalValue'];
    loanInfo.purpose = this.getPurpose(info['purpose']);
    loanInfo.loanType = this.getLoanType(info['loanType']);
    loanInfo.combinedLtvRatioPercent = info['combinedLtvRatioPercent'];
    loanInfo.creditScore =  info['creditScore'];
    loanInfo.apr = info['apr'];
    loanInfo.escrowWaiver = info['escrowWaiver'];
    loanInfo.ltvRatioPercent = info['ltvRatioPercent'];
    loanInfo.noteRate = info['noteRate'];
    loanInfo.term = info['term'];
    loanInfo.purchasePrice = info['purchasePrice'];
    loanInfo.units = info['units'];
    loanInfo.subjectPropertyAddress = this.getSubjectPropertyAddress(info['subjectPropertyAddress']);
    loanInfo.occupancy = this.getOccupancy(info['occupancy']);
    loanInfo.coBorrower = this.getCoBorrower(info['coBorrower']);
    loanInfo.loanOfficer = this.getLoanOfficer(info['loanOfficer']);
    loanInfo.propertyType = this.getPropertyType(info['propertyType']);
    loanInfo.loanStatus = this.getLoanStatus(info['loanStatus']);
     return loanInfo;
  }
  private getLoanStatus(pt : LoanStatus): LoanStatus {
    let loanStatus = new LoanStatus();
    if(pt) {
      loanStatus.name = pt['name'];
    }
    return loanStatus;
  }
  private getPropertyType(pt : PropertyType): PropertyType {
    let propertyType = new PropertyType();
    if(pt) {
      propertyType.name = pt['name'];
    }
    return propertyType;
  }
  private getLoanOfficer(officer : LoanOfficer): LoanOfficer {
    let loanOfficer = new LoanOfficer();
    if(officer) {
      loanOfficer.email = officer['email'];
      loanOfficer.name = officer['name'];
      loanOfficer.mobilePhone = officer['mobilePhone'];
      loanOfficer.workPhone = officer['workPhone'];
    }
    return loanOfficer;
  }
  private getCoBorrower(bor : Coborrower): Coborrower {
    let coborrower = new Coborrower();
    if(bor) {
      coborrower.firstName = bor['firstName'];
      coborrower.lastName = bor['lastName'];
      coborrower.middleName = bor['middleName'];
    }
    return coborrower;
  }
  private getOccupancy(occu : Occupancy): Occupancy {
    let occupancy = new Occupancy();
    if(occu) {
      occupancy.name = occu['name'];
    }
    return occupancy;
  }
  private getSubjectPropertyAddress(sb : SubjectPropertyAddress): SubjectPropertyAddress {
    let subjectPropertyAddress = new SubjectPropertyAddress();
    if(sb) {
      subjectPropertyAddress.city = sb['city'];
      subjectPropertyAddress.county = sb['county'];
      subjectPropertyAddress.state = sb['state'];
      subjectPropertyAddress.street = sb['street'];
      subjectPropertyAddress.zipCode = sb['zipCode'];
    }
    return subjectPropertyAddress;
  }
  private getBorrower(bor : Borrower): Borrower {
    let borrower = new Borrower();
    if(bor) {
      borrower.firstName = bor['firstName'];
      borrower.lastName = bor['lastName'];
      borrower.middleName = bor['middleName'];

    }
    return borrower;
  }
  private getPurpose(bor : Purpose): Purpose {
    let pur = new Purpose();
    if(bor) {
      pur.name = bor['name'];
    }
    return pur;
  }
  private getLoanType(bor : LoanType): LoanType {
    let lType = new LoanType();
    if(bor) {
      lType.name = bor['name'];
    }
    return lType;
  }
  public getLoanById(itemId : string): Observable<LoanInfo> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_loan_by_itemId?itemId=' + itemId, this.requestOptions
      )
      .pipe(
        map(response => {
          return this.getLoanInfo(<LoanInfo>response);
        })
      )
  }
  public getQuoteResults(
   itemId : string,selectedUserMloUUID : string
  ): Observable<QuickQuoteResultsRoot> {
      return this.http
        .get(API_URL + '/api/v1/lockdesk/get_quote_results?itemId=' + itemId + '&selectedUserMloUUID=' + encodeURIComponent(selectedUserMloUUID))
        .pipe(
          map(qqResRoot => {
            return new QuickQuoteResultsRoot(
              qqResRoot['obBestExResponseDTO'],
              qqResRoot['obBadRequestResponsDTO'],
              qqResRoot['obIneligibleResponseDTO'],
              qqResRoot['quoteId'],
              qqResRoot['success']
            );
          })
        );
    }
  public gerUserMLO(user: UserMlo): UserMlo {
    let user1 = new UserMlo();
    user1.firstName = user['firstName'];
    user1.lastName = user['lastName'];
    user1.userName = user['userName'];
    user1.brokercompanyId = user['brokerCompanyId'];
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
    if (user['userContact']) {
      user1.userContact = this.getUserContact(user['userContact']);
    }
    return user1;
  }
  public getUserContact(userCon: UserContact): UserContact {
    const userContact = new UserContact();
    userContact.contactId = userCon['contactId'];
    userContact.contactInfoBcc = userCon['contactInfoBcc'];
    userContact.phoneWork = userCon['phoneWork'];
    userContact.phoneMobile = userCon['phoneMobile'];
    userContact.lastUpdatedBy = userCon['lastUpdatedBy'];
    return userContact;
  }

  public getProductDetails(productId: string,
                           searchId: string,
                           quoteId: string
  ): Observable<ProductDetailRoot> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_product_details?productId=' + productId+"&searchId="+searchId+"&quoteId="+quoteId
      )
      .pipe(
        map(productDetailRoot => {
           return new ProductDetailRoot(
            productDetailRoot['obBestExProductDetailResponseDTO'],
            productDetailRoot['quoteId'],
            productDetailRoot['obBadRequestResponsDTO'],
            productDetailRoot['success'],
            this.gerUserMLO(<UserMlo>productDetailRoot['userDTO'])
          );
        })
      );
  }

  public saveLockLoan(data: LockLoan): Observable<LockLoan> {
    return this.http
      .post(
        API_URL + "/api/v1/lockdesk/save_lock_loan",
        data, this.requestOptions
      )
      .pipe(
        map(response => {
          return this.getLockLoan(<LockLoan>response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }

  public getInitialLockLoan(loanNumber: string): Observable<LockLoan> {
    return this.http
      .get(
        API_URL + "/api/v1/lockdesk/get_initial_lock_loan?loanNumber="+loanNumber
        , this.requestOptions
      )
      .pipe(
        map(response => {
          return this.getLockLoan(<LockLoan>response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  public getFinalLockLoan(loanNumber: string): Observable<LockLoan> {
    return this.http
      .get(
        API_URL + "/api/v1/lockdesk/get_final_lock_loan?loanNumber="+loanNumber
        , this.requestOptions
      )
      .pipe(
        map(response => {
          return this.getLockLoan(<LockLoan>response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  public getLockLoan(ll : LockLoan): LockLoan {
    const lockLoan = new LockLoan();
    if (ll){
    lockLoan.loanInfo = ll['loanInfo'];
    lockLoan.lockStatus = ll['lockStatus'];
    lockLoan.lockState = ll['lockState'];
    lockLoan.lockDays = ll['lockDays'];
    lockLoan.selectedQuote = ll['selectedQuote'];
    lockLoan.selectedProduct = ll['selectedProduct'];
    lockLoan.productDetail = ll['productDetail'];
    lockLoan.lockDate = ll['lockDate'];
    lockLoan.loanNumber = ll['loanNumber'];
    lockLoan.lastUpdatedDate = ll['lastUpdatedDate'];
    lockLoan.lastUpdatedBy = ll['lastUpdatedBy'];
    lockLoan.id = ll['id'];
    lockLoan.isActive = ll['isActive'];
    lockLoan.lockExpirationDate = ll['lockExpirationDate'];
    lockLoan.lockExpired = ll['lockExpired'];
    lockLoan.adjustments = ll['adjustments'];
    lockLoan.lockLoanSuccessful = ll['lockLoanSuccessful'];
  }
    return lockLoan;
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
  public getLockLoanItemsByLoanNumber(loanNumber : string): Observable<LockLoan[]> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_lock_loan_items?loanNumber=' + loanNumber, this.requestOptions
      ).pipe(
        map(response => {
          return this.getLockLoans(response);
        })
      )
  }
  public getLockLoans(response: any): LockLoan[] {
    return (<LockLoan[]>response).map(
      ll =>
        this.getLockLoan(ll)
    );
  }
  public getLockLoanConfirmationData(loanNumber: string): Observable<LockLoanConfirmation> {
    return this.http
      .get(
        API_URL + "/api/v1/lockdesk/get_lock_loan_confirmation_data?loanNumber="+loanNumber
        , this.requestOptions
      )
      .pipe(
        map(response => {
          return this.getLockLoanConfirmation(<LockLoanConfirmation>response);
        })
      )
      .pipe(catchError(this.errorHandler));
  }
  private getLockLoanConfirmation(ll : LockLoanConfirmation): LockLoanConfirmation {
    const lockLoanConfirmation = new LockLoanConfirmation();
    lockLoanConfirmation.initialLockLoan = this.getLockLoan(ll['initialLockLoan'])
    lockLoanConfirmation.finalLockLoan = this.getLockLoan(ll['finalLockLoan'])
    if(ll['initialAndFinalAdjustments']) {
      lockLoanConfirmation.initialAndFinalAdjustments = ll['initialAndFinalAdjustments'];
    }
    if(ll['initialAndFinalMargins']) {
      lockLoanConfirmation.initialAndFinalMargins = ll['initialAndFinalMargins'];
    }
    if(ll['initialAndFinalBasePrice']) {
      lockLoanConfirmation.initialAndFinalBasePrice = ll['initialAndFinalBasePrice'];
    }
    if(ll['initialAndFinalPrice']) {
      lockLoanConfirmation.initialAndFinalPrice = ll['initialAndFinalPrice'];
    }
    return lockLoanConfirmation;
  }

}
