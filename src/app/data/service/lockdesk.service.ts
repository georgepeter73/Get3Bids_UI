import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Borrower} from '@data/schema/lockdesk/borrower';
import {Purpose} from '@data/schema/lockdesk/purpose';
import {LoanType} from '@data/schema/lockdesk/loantype';
const API_URL = environment.LOCKDESK_API_URL;

@Injectable()
export class LockDeskService {
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
  public getLoanPipeline(mloEmail : string): Observable<LoanInfo[]> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_loan_pipeline?mloEmail=' + mloEmail
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
    return loanInfo;
  }
  private getBorrower(bor : Borrower): Borrower {
    let borrower = new Borrower();
    borrower.firstName = bor['firstName'];
    borrower.lastName = bor['lastName'];
    borrower.middleName = bor['middleName'];
    return borrower;
  }
  private getPurpose(bor : Purpose): Purpose {
    let pur = new Purpose();
    pur.name = bor['name'];
    return pur;
  }
  private getLoanType(bor : LoanType): LoanType {
    let lType = new LoanType();
    lType.name = bor['name'];
    return lType;
  }
  public getLoanById(itemId : string): Observable<LoanInfo> {
    return this.http
      .get(API_URL + '/api/v1/lockdesk/get_loan_by_itemId?itemId=' + itemId
      )
      .pipe(
        map(response => {
          return this.getLoanInfo(<LoanInfo>response);
        })
      )
  }
}
