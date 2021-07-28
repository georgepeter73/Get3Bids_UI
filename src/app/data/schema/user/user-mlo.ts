import {UserMedia} from '@data/schema/user/user-media';
import {UserMloPricing} from '@data/schema/user/user-mlo-pricing';
export class UserMlo{
  constructor(userMedias?: UserMedia[], userPricing?: UserMloPricing, firstName?: string, lastName?: string,
              userName?: string, brokerCompanyId?: number, clientId?: number, enterpriseId?: number,
              reportToUserId?: number, userUUID?: string, floifyTeamManagerFlag?: boolean,
              floifyTeamManagerId?: number, lastUpdatedAt?: Date, lastUpdatedBy?: string, deleteFlag?: boolean) {
    this.userMedias = userMedias;
    this.userPricing = userPricing;
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
  }
  userMedias : UserMedia[];
  userPricing : UserMloPricing;
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



}
