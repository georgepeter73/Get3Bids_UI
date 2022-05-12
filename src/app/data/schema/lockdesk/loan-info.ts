import {Borrower} from '@data/schema/lockdesk/borrower';

export class LoanInfo{
   loanId : string;
   companyId: string;
   loanNumber: string;
   borrower : Borrower;
}
