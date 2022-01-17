import {BrokerCompanyDetail} from '@data/schema/company/broker-company-detail';
import {Address} from '@data/schema/company/address';
import {BrokerCompanyPricing} from '@data/schema/company/broker-company-pricing';

export class BrokerCompanyInfo{
  brokercompanyId =0;
  name = '';
  statusId = 0;
  addressId = 0;
  clientId =0;
  brokerCompanyDetailDTO = new BrokerCompanyDetail();
  brokerCompanyPricingDTO = new BrokerCompanyPricing();
  addressDTO = new Address();
  lastUpdatedAt = new Date();
  lastUpdatedBy = '';
  companyUUID = '';
  companyMargin = 0;

}
