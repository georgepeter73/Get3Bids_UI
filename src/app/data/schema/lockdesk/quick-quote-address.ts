export class QuickQuoteAddress {
  quoteAddressId: number;
  quoteId: number;
  zip: number;
  state: string;
  countyCode: number;
  city: string;
  deleteFlag: boolean;
  lastUpdatedBy: string;
  lastUpdatedAt: string;

  constructor(
    quoteAddressId: number,
    quoteId: number,
    zip: number,
    state: string,
    countyCode: number,
    city: string,
    deleteFlag: boolean,
    lastUpdatedBy: string,
    lastUpdatedAt: string
  ) {
    this.quoteAddressId = quoteAddressId;
    this.quoteId = quoteId;
    this.zip = zip;
    this.state = state;
    this.countyCode = countyCode;
    this.city = city;
    this.deleteFlag = deleteFlag;
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
  }
}
