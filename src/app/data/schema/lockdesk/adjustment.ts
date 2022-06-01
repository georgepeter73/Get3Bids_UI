export class Adjustment {
  reason: string;
  adjustor: string;
  type: string;
  constructor(reason: string, adjustor: string, type: string) {
    this.reason = reason;
    this.adjustor = adjustor;
    this.type = type;
  }
}
