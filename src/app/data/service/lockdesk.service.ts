import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
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
const API_URL = environment.LOCKDESK_API_URL;

@Injectable()
export class LockDeskService {
  private payload: string;
  headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*'
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
}
