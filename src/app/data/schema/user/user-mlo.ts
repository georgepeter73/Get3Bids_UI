export class UserMlo{
  constructor( firstName?: string, lastName?: string,
              userName?: string, brokerCompanyId?: number, clientId?: number, enterpriseId?: number,
              reportToUserId?: number, userUUID?: string, floifyTeamManagerFlag?: boolean,
              floifyTeamManagerId?: number, lastUpdatedAt?: Date, lastUpdatedBy?: string, deleteFlag?: boolean,
               loPricingId? : number, loMargin?: number, userId?:number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.brokerCompanyId = brokerCompanyId;
    this.clientId = clientId;
    this.enterpriseId = enterpriseId;
    this.reportToUserId = reportToUserId;
    this.userUUID = userUUID;
    this.floifyTeamManagerFlag = floifyTeamManagerFlag;
    this.floifyTeamManagerId = floifyTeamManagerId;
    this.lastUpdatedAt = lastUpdatedAt;
    this.lastUpdatedBy = lastUpdatedBy;
    this.deleteFlag = deleteFlag;
    this.loPricingId = loPricingId;
    this.loMargin = loMargin;
    this.userId = userId;

  }

  firstName : string;
  lastName : string;
  userName : string;
  brokerCompanyId : number;
  clientId : number;
  enterpriseId : number;
  reportToUserId : number;
  userUUID : string;
  floifyTeamManagerFlag : boolean;
  floifyTeamManagerId : number;
  lastUpdatedAt : Date;
  lastUpdatedBy : string;
  deleteFlag : boolean;
  floifyNotTeamManagerFlag : boolean;
  userId : number;
  loPricingId : number;
  loMargin: number;



}
