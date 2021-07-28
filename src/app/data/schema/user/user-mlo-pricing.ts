export class UserMloPricing{
  constructor(loPricingId?: number, userId?: number, loMargin?: number, lastUpdatedAt?: Date, lastUpdatedBy?: string, createdAt?: Date, deleteFlag?: boolean) {
    this.loPricingId = loPricingId;
    this.userId = userId;
    this.loMargin = loMargin;
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
    this.createdAt = createdAt;
    this.deleteFlag = deleteFlag;
  }
  loPricingId : number;
  userId : number;
  loMargin : number;
  lastUpdatedAt : Date;
  lastUpdatedBy : string;
  createdAt : Date;
  deleteFlag : boolean;
}
