import { BrokerCompanyInfo } from '@data/schema/lockdesk/broker-company-info';

export class BrokerCompanyMedia {
  brokerCompanyMediaId: number;
  userId: number;
  mediaURL: string;
  mediaType: number;
  mediaDescription: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
  deleteFlag: boolean;
  mediaId: number;
  brokerCompanyDTO: BrokerCompanyInfo;
}
