import { Quote } from '@data/schema/lockdesk/quote';
import { Adjustment } from '@data/schema/lockdesk/adjustment';
import { ParQuote } from '@data/schema/lockdesk/par-quote';
import { Message } from '@data/schema/lockdesk/message';

export class ProductDetail {
  productName: string;
  quotes: Quote[];
  adjustments: Adjustment[];
  parQuotes: ParQuote[];
  searchId: string;
  productId: number;
  totalRateAdjustment: number;
  totalPriceAdjustment: number;
  totalSRPAdjustment: number;
  totalMarginAdjustment: number;
  notesAndAdvisories: string[];
  armSubsequentChangePeriod: number;
  armIndex: string;
  armIndexValue: number;
  armFirstCap: number;
  armPeriodicCap: number;
  armFixedTerm: number;
  armLifetimeCap: number;
  armRelativeCap: number;
  originationFees: number;
  investorId: number;
  messages: Message[];
  constructor(
    productName: string,
    quotes: Quote[],
    adjustments: Adjustment[],
    parQuotes: ParQuote[],
    searchId: string,
    productId: number,
    totalRateAdjustment: number,
    totalPriceAdjustment: number,
    totalSRPAdjustment: number,
    totalMarginAdjustment: number,
    notesAndAdvisories: string[],
    armSubsequentChangePeriod: number,
    armIndex: string,
    armIndexValue: number,
    armFirstCap: number,
    armPeriodicCap: number,
    armFixedTerm: any,
    armLifetimeCap: number,
    armRelativeCap: number,
    originationFees: number,
    investorId: number,
    messages: Message[]
  ) {
    this.productName = productName;
    this.quotes = quotes;
    this.adjustments = adjustments;
    this.parQuotes = parQuotes;
    this.searchId = searchId;
    this.productId = productId;
    this.totalRateAdjustment = totalRateAdjustment;
    this.totalPriceAdjustment = totalPriceAdjustment;
    this.totalSRPAdjustment = totalSRPAdjustment;
    this.totalMarginAdjustment = totalMarginAdjustment;
    this.notesAndAdvisories = notesAndAdvisories;
    this.armSubsequentChangePeriod = armSubsequentChangePeriod;
    this.armIndex = armIndex;
    this.armIndexValue = armIndexValue;
    this.armFirstCap = armFirstCap;
    this.armPeriodicCap = armPeriodicCap;
    this.armFixedTerm = armFixedTerm;
    this.armLifetimeCap = armLifetimeCap;
    this.armRelativeCap = armRelativeCap;
    this.originationFees = originationFees;
    this.investorId = investorId;
    this.messages = messages;
  }
}
