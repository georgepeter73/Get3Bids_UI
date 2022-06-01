export class ProductGroup{

  amortizationTerm : number;
  amortizationType :string;
  productName:string
  constructor(amortizationTerm : number, amortizationType :string,productName:string) {
    this.amortizationTerm = amortizationTerm;
    this.amortizationType = amortizationType;
    this.productName = productName;
  }

}
