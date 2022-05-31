import {Borrower} from '@data/schema/lockdesk/borrower';
import {LoanType} from '@data/schema/lockdesk/loantype';
import {Purpose} from '@data/schema/lockdesk/purpose';
import {Occupancy} from '@data/schema/lockdesk/occupancy';
import {LoanOfficer} from '@data/schema/lockdesk/loan-officer';
import {PropertyType} from '@data/schema/lockdesk/property-type';
import {SubjectPropertyAddress} from '@data/schema/lockdesk/subject-property-address';
import {Coborrower} from '@data/schema/lockdesk/coborrower';
import {Program} from '@data/schema/lockdesk/program';
import {LoanStatus} from '@data/schema/lockdesk/loan-status';

export class LoanInfo{
  loanId : string;
  companyId: string;
  loanNumber: string;
  borrower : Borrower;
  coBorrower : Coborrower;
  loanType : LoanType;
  purpose : Purpose;
  loanAmount : string;
  appraisalValue : string;
  id : string;
  occupancy : Occupancy;
  loanOfficer : LoanOfficer;
  purchasePrice : string;
  creditScore : number;
  term : number;
  noteRate : number;
  propertyType : PropertyType;
  units : number;
  subjectPropertyAddress : SubjectPropertyAddress;
  program : Program;
  escrowWaiver : boolean;
  apr : number;
  ltvRatioPercent : number;
  combinedLtvRatioPercent : number;
  loanStatus : LoanStatus;





}
