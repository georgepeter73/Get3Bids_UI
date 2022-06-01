export class NewLoanPositiveResponse {
  success: string;
  loan: number;
  error: number;
  constructor(success?: string, loan?: number, error?: number) {
    this.success = success;
    this.loan = loan;
    this.error = error;
  }
}
