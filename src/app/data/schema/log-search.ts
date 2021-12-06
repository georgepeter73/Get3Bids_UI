import {UserMlo} from '@data/schema/user/user-mlo';

export class LogSearch{
  quoteId : string;
  products : string;
  productsBadResponse : string;
  quoteRequest : string;
  ineligibleProducts : string;
  searchId : string
  loanId : string
  prospectsId : string
  floifyRequestData : string
  floifyResponseData: string
  firstName: string
  lastName: string
  middleName: string
  suffixName: string
  email: string
  phone: string
  lastUpdatedAt : Date
  userMLO : UserMlo
}
