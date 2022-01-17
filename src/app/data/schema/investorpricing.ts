export class InvestorPricing{
  investorPricingId: number;
  investorId : number;
  loanType : number;
  investorMargin : number
  lastUpdatedBy: string;
  lastUpdatedAt : Date
  loMargin : number
  companyMargin : number = 0;
  totalMargin : number;
  channelType : number;
}
