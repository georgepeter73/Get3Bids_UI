import { Product } from './product';
import { Message } from '@data/schema/message';

export class TotalLoanAmountDetails {
  totalLoanAmount: number;
  constructor(totalLoanAmount?: number) {
    this.totalLoanAmount = totalLoanAmount;
  }
}
export class QuickQuoteResults {
  products: Product[];
  totalLoanAmountDetails: TotalLoanAmountDetails;
  cltv: number;
  ltv: number;
  hcltv: number;
  searchId: string;
  searchTime: string;
  customerInternalId: string;
  messages: Message[];
  constructor(
    products?: Product[],
    totalLoanAmountDetails?: TotalLoanAmountDetails,
    cltv?: number,
    ltv?: number,
    hcltv?: number,
    searchId?: string,
    searchTime?: string,
    customerInternalId?: string,
    messages?: Message[]
  ) {
    this.products = products.map(
      product =>
        new Product(
          product ? product.apr : null,
          product ? product.armIndex : null,
          product ? product.closingCost : null,
          product ? product.lastUpdate : null,
          product ? product.loanTerm : null,
          product ? product.lockPeriod : null,
          product ? product.armMargin : null,
          product ? product.price : null,
          product ? product.rate : null,
          product ? product.rebate : null,
          product ? product.discount : null,
          product ? product.principalAndInterest : null,
          product ? product.monthlyMI : null,
          product ? product.totalPayment : null,
          product ? product.amortizationTerm : null,
          product ? product.amortizationType : null,
          product ? product.investorId : null,
          product ? product.investor : null,
          product ? product.loanType : null,
          product ? product.priceStatus : null,
          product ? product.pendingUpdate : null,
          product ? product.productCode : null,
          product ? product.productId : null,
          product ? product.productName : null,
          product ? product.quoteId : null,
          product ? product.searchId : null,
          product ? product.guidelines : null
        )
    );
    this.totalLoanAmountDetails = new TotalLoanAmountDetails(
      totalLoanAmountDetails ? totalLoanAmountDetails.totalLoanAmount : null
    );
    this.cltv = cltv;
    this.ltv = ltv;
    this.hcltv = hcltv;
    this.searchId = searchId;
    this.searchTime = searchTime;
    this.customerInternalId = customerInternalId;
    this.messages = messages;
  }
}
