import {UserContact} from '@data/schema/lockdesk/user-contact';

export class UserMLO {
  firstName: string;
  lastName: string;
  userName: string;
  brokerCompanyId: number;
  clientId: number;
  enterpriseId: number;
  reportToUserId: number;
  userUUID: string;
  floifyTeamManagerFlag: boolean;
  floifyTeamManagerId: number;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
  deleteFlag: boolean;
  floifyNotTeamManagerFlag: boolean;
  userId: number;
  loPricingId: number;
  loMargin: number;
  floifyAccountApprovalFlag: boolean;
  userContact : UserContact;
}
