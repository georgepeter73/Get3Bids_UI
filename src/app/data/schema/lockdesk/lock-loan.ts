import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Product} from '@data/schema/lockdesk/product';
import {Quote} from '@data/schema/lockdesk/quote';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';
import {Adjustment} from '@data/schema/lockdesk/adjustment';
import {UserMlo} from '@data/schema/user/user-mlo';
import {LockLoanextension} from '@data/schema/lockdesk/lock-loanextension';

export class LockLoan{
  id : string;
  loanNumber : string;
  //this id is nothing but lendingpad loan item id in dynamodb
  itemId : string;
  loanInfo: LoanInfo;
  selectedProduct : Product;
  selectedQuote : Quote;
  lockStatus : number;
  lockState : number;
  lockDate : Date;
  lockDateStr : string;
  lockDays : number;
  lastUpdatedDate : Date;
  lastUpdatedDateStr : string;
  lastUpdatedBy :string;
  lockStatusStr : string;
  lockRequestStatusStr : string;
  productDetail : ProductDetail;
  isActive : boolean;
  lockExpirationDate : Date;
  lockExpirationDateStr : string;
  lockExpired : boolean;
  adjustments: Adjustment[];
  selectedUserMloUUID : String;
  lockLoanSuccessful : boolean;
  repriceSuccess : boolean;
  lockExtensionDays : LockLoanextension[];



}
