export class Adjustment {
  reason: string;
  adjustor: string;
  type: string;
  finalAdjustor : string;
  initialAdjustor : string;

  constructor(reason?: string, adjustor?: string, type?: string,initialAdjustor? : string,finalAdjustor ?: string) {
    this.reason = reason;
    this.adjustor = adjustor;
    this.type = type;
    this.initialAdjustor = initialAdjustor;
    this.finalAdjustor = finalAdjustor;
  }
}
