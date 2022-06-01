import { isBoolean } from 'util';

export class Quote {
  rate: number;
  lockPeriod: number;
  lockExpirationDate: string;
  apr: number;
  price: number;
  armMargin: number;
  closingCost: number;
  discountDollar: number;
  discountPercent: number;
  rebateDollar: number;
  rebatePercent: number;
  loCompensationDollar: number;
  loCompensationPercent: number;
  principalAndInterest: number;
  totalCredit: number;
  monthlyMi: number;
  totalPayment: number;
  investorLevelMargin: number;
  mloLevelMargin: number;
  companyLevelMargin: number;
  companyPricingMarginApplied: boolean;
  mlopricingMarginApplied: boolean;

  constructor(
    rate: number,
    lockPeriod: number,
    lockExpirationDate: string,
    apr: number,
    price: number,
    armMargin: number,
    closingCost: number,
    discountDollar: number,
    discountPercent: number,
    rebateDollar: number,
    rebatePercent: number,
    loCompensationDollar: number,
    loCompensationPercent: number,
    principalAndInterest: number,
    totalCredit: number,
    monthlyMi: number,
    totalPayment: number,
    investorLevelMargin: number,
    mloLevelMargin: number,
    companyLevelMargin: number,
    companyPricingMarginApplied: boolean,
    mlopricingMarginApplied: boolean
  ) {
    this.rate = rate;
    this.lockPeriod = lockPeriod;
    this.lockExpirationDate = lockExpirationDate;
    this.apr = apr;
    this.price = price;
    this.armMargin = armMargin;
    this.closingCost = closingCost;
    this.discountDollar = discountDollar;
    this.discountPercent = discountPercent;
    this.rebateDollar = rebateDollar;
    this.rebatePercent = rebatePercent;
    this.loCompensationDollar = loCompensationDollar;
    this.loCompensationPercent = loCompensationPercent;
    this.principalAndInterest = principalAndInterest;
    this.totalCredit = totalCredit;
    this.monthlyMi = monthlyMi;
    this.totalPayment = totalPayment;
    this.investorLevelMargin = investorLevelMargin;
    this.mloLevelMargin = mloLevelMargin;
    this.companyLevelMargin = companyLevelMargin;
    this.companyPricingMarginApplied = companyPricingMarginApplied;
    this.mlopricingMarginApplied = mlopricingMarginApplied;
  }
}
