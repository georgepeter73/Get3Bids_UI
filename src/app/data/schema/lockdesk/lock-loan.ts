import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {Product} from '@data/schema/lockdesk/product';
import {Quote} from '@data/schema/lockdesk/quote';
import {ProductDetail} from '@data/schema/lockdesk/product-detail';

export class LockLoan{
  id : string;
  loanNumber : string;
  //this id is nothing but lendingpad loan item id in dynamodb
  itemId : string;
  loanInfo: LoanInfo;
  selectedProduct : Product;
  selectedQuote : Quote;
  lockStatus : number;
  lockRequestStatus : number;
  lockDate : Date;
  lockDays : number;
  lastUpdatedDate : Date;
  lastUpdatedBy :string;
  lockStatusStr : string;
  lockRequestStatusStr : string;
  productDetail : ProductDetail;

}
