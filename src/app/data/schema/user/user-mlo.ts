import {UserMedia} from '@data/schema/user/user-media';
import {UserContact} from '@data/schema/user/user-contact';
import {LoSiteDTO} from '@data/schema/user/lo-site';

export class UserMlo{
  firstName : string;
  lastName : string;
  userName : string;
  brokercompanyId : number=0;
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
  floifyAccountApprovalFlag : boolean;
  userMediaList : UserMedia[];
  userContact : UserContact;
  loSiteDTO : LoSiteDTO;



}
