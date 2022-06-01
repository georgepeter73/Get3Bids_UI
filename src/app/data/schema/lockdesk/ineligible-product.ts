export class IneligibleProduct {
  apr: number;
  armIndex: string;
  closingCost: number;
  lastUpdate: string;
  loanTerm: string;
  lockPeriod: number;
  armMargin: number;
  price: number;
  rate: number;
  rebate: number;
  discount: number;
  principalAndInterest: number;
  monthlyMI: number;
  totalPayment: number;
  amortizationTerm: string;
  amortizationType: string;
  investorId: number;
  investor: string;
  loanType: string;
  priceStatus: string;
  pendingUpdate: boolean;
  productCode: string;
  productId: number;
  productName: string;
  quoteId : number;
  searchId : string;
  ineligibleReason : string[]
  ineligibleStatus : string ;

  constructor(
    apr: number,
    armIndex: string,
    closingCost: number,
    lastUpdate: string,
    loanTerm: string,
    lockPeriod: number,
    armMargin: number,
    price: number,
    rate: number,
    rebate: number,
    discount: number,
    principalAndInterest: number,
    monthlyMI: number,
    totalPayment: number,
    amortizationTerm: string,
    amortizationType: string,
    investorId: number,
    investor: string,
    loanType: string,
    priceStatus: string,
    pendingUpdate: boolean,
    productCode: string,
    productId: number,
    productName: string,
    quoteId : number,
    searchId : string,
    ineligibleReason : string[],
    ineligibleStatus : string

  ) {
    this.apr = apr;
    this.armIndex = armIndex;
    this.closingCost = closingCost;
    this.lastUpdate = lastUpdate;
    this.loanTerm = loanTerm;
    this.lockPeriod = lockPeriod;
    this.armMargin = armMargin;
    this.price = price;
    this.rate = rate;
    this.rebate = rebate;
    this.discount = discount;
    this.principalAndInterest = principalAndInterest;
    this.monthlyMI = monthlyMI;
    this.totalPayment = totalPayment;
    this.amortizationTerm = amortizationTerm;
    this.amortizationType = amortizationType;
    this.investorId = investorId;
    this.investor = investor;
    this.loanType = loanType;
    this.priceStatus = priceStatus;
    this.pendingUpdate = pendingUpdate;
    this.productCode = productCode;
    this.productId = productId;
    this.productName = productName;
    this.quoteId = quoteId;
    this.searchId = searchId;
    this.ineligibleReason = ineligibleReason;
    this.ineligibleStatus = ineligibleStatus;
  }
}
