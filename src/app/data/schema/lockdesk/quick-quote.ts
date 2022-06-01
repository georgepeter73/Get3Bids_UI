import { QuickQuoteAddress } from './quick-quote-address';
export class QuickQuote {
  quoteId: number;
  transactionType: number;
  occupancyType: number;
  employmentType: number;
  incomeDocumentationType: number;
  propertyInformationType: number;
  propertyValue: number;
  purchasePrice: number;
  downpayment: number;
  expectedValueOfProperty: number;
  requestedLoanAmount: number;
  creditScoreType: number;
  mortgageInsuranceType: number;
  taxesInsuranceEscrowsType: number;
  prePaymentPenaltyType: number;
  loanToValue: number;
  govtLoan: boolean;
  deleteFlag: boolean;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
  quoteAddressDTO: QuickQuoteAddress;
  firstLienAmount: number;
  cashOutAmount: number;
  loUUID: string;
  campaignType: string;
  vaLoanType: string;
  searchId: string;
  creditScore: number;
  numberOfUnits: number;
  companyLOUUID? : string;

  constructor(
    quoteId?: number,
    transactionType?: number,
    occupancyType?: number,
    employmentType?: number,
    incomeDocumentationType?: number,
    propertyInformationType?: number,
    propertyValue?: number,
    purchasePrice?: number,
    downpayment?: number,
    expectedValueOfProperty?: number,
    requestedLoanAmount?: number,
    creditScoreType?: number,
    mortgageInsuranceType?: number,
    taxesInsuranceEscrowsType?: number,
    prePaymentPenaltyType?: number,
    loanToValue?: number,
    govtLoan?: boolean,
    deleteFlag?: boolean,
    lastUpdatedBy?: string,
    lastUpdatedAt?: string,
    quoteAddressDTO?: QuickQuoteAddress,
    firstLienAmount?: number,
    cashOutAmount?: number,
    loUUID?: string,
    campaignType?: string,
    vaLoanType?: string,
    searchId?: string,
    creditScore?: number,
    companyLOUUID? : string,
  ) {
    this.quoteId = quoteId;
    this.transactionType = transactionType;
    this.occupancyType = occupancyType;
    this.employmentType = employmentType;
    this.incomeDocumentationType = incomeDocumentationType;
    this.propertyInformationType = propertyInformationType;
    this.propertyValue = propertyValue;
    this.purchasePrice = purchasePrice;
    this.downpayment = downpayment;
    this.expectedValueOfProperty = expectedValueOfProperty;
    this.requestedLoanAmount = requestedLoanAmount;
    this.creditScoreType = creditScoreType;
    this.mortgageInsuranceType = mortgageInsuranceType;
    this.taxesInsuranceEscrowsType = taxesInsuranceEscrowsType;
    this.prePaymentPenaltyType = prePaymentPenaltyType;
    this.loanToValue = loanToValue;
    this.govtLoan = govtLoan;
    this.deleteFlag = deleteFlag;
    this.lastUpdatedBy = lastUpdatedBy;
    this.lastUpdatedAt = lastUpdatedAt;
    this.firstLienAmount = firstLienAmount;
    this.cashOutAmount = cashOutAmount;
    this.quoteAddressDTO = new QuickQuoteAddress(
      quoteAddressDTO ? quoteAddressDTO.quoteAddressId : null,
      quoteAddressDTO ? quoteAddressDTO.quoteId : null,
      quoteAddressDTO ? quoteAddressDTO.zip : null,
      quoteAddressDTO ? quoteAddressDTO.state : null,
      quoteAddressDTO ? quoteAddressDTO.countyCode : null,
      quoteAddressDTO ? quoteAddressDTO.city : null,
      quoteAddressDTO ? quoteAddressDTO.deleteFlag : null,
      quoteAddressDTO ? quoteAddressDTO.lastUpdatedBy : null,
      quoteAddressDTO ? quoteAddressDTO.lastUpdatedAt : null
    );
    this.loUUID = loUUID;
    this.campaignType = campaignType;
    this.vaLoanType = vaLoanType;
    this.searchId = searchId;
    this.creditScore = creditScore;
    this.companyLOUUID = companyLOUUID;
  }
}
