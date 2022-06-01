export class QuoteBorrowerInfo {
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
  deleteFlag: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  quoteBorrowerInfoId: number;
  loUUID: string;
  constructor(
    lastUpdatedAt?: Date,
    lastUpdatedBy?: string,
    deleteFlag?: boolean,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    quoteBorrowerInfoId?: number,
    loUUID?: string
  ) {
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
    this.deleteFlag = deleteFlag;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.quoteBorrowerInfoId = quoteBorrowerInfoId;
    this.loUUID = loUUID;
  }
}
