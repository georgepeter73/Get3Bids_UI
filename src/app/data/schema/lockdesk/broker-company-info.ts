import { BrokerCompanyDetail } from '@data/schema/lockdesk/broker-company-detail';
import { BrokerCompanyMedia } from '@data/schema/lockdesk/broker-company-media';

class BrokerCompanyPricing {}

export class BrokerCompanyInfo {
  brokercompanyId = 0;
  name = '';
  statusId = 0;
  addressId = 0;
  clientId = 0;
  brokerCompanyDetailDTO = new BrokerCompanyDetail();
  brokerCompanyMediaList: BrokerCompanyMedia[] = [];
  lastUpdatedAt = new Date();
  lastUpdatedBy = '';
  companyUUID = '';
  companyMargin = 0;
}
