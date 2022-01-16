import {BrokerCompanyDetail} from '@data/schema/company/broker-company-detail';
import {Address} from '@data/schema/company/address';

export class BrokerCompanyInfo{
  brokercompanyId =0;
  name = '';
  statusId = 0;
  addressId = 0;
  clientId =0;
  brokerCompanyDetailDTO = new BrokerCompanyDetail();
  addressDTO = new Address();
  lastUpdatedAt = new Date();
  lastUpdatedBy = '';
  companyUUID = '';

}
