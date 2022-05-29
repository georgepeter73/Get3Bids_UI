import {Borrower} from '@data/schema/lockdesk/borrower';
import {LoanType} from '@data/schema/lockdesk/loantype';
import {Purpose} from '@data/schema/lockdesk/purpose';

export class LoanInfo{
   loanId : string;
   companyId: string;
   loanNumber: string;
   borrower : Borrower;
   loanType : LoanType;
   purpose : Purpose;
   loanAmount : string;
   appraisalValue : string;
   id : string;
}
