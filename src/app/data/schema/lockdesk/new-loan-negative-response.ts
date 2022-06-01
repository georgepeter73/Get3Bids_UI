export class NewLoanNegativeResponse {
  error: string;
  constructor(error?: string) {
    this.error = error;
  }
}
