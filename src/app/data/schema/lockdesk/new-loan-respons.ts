import { NewLoanNegativeResponse } from '@data/schema/lockdesk/new-loan-negative-response';
import {ProspectsPostiveResponse} from '@data/schema/lockdesk/ProspectsPostiveResponse';

export class NewLoanResponse {
  prospectsPositiveResponse : ProspectsPostiveResponse
  floifyNegativeResponse: NewLoanNegativeResponse;


  constructor(
    prospectsPositiveResponse?: ProspectsPostiveResponse,
    floifyNegativeResponse?: NewLoanNegativeResponse
  ) {
    this.prospectsPositiveResponse = prospectsPositiveResponse;
    this.floifyNegativeResponse = floifyNegativeResponse;
  }
}
