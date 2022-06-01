
import {IneligibleProduct} from '@data/schema/lockdesk/ineligible-product';

export class IneligibleProductResponse {
  ineligibleProducts: IneligibleProduct[];
  searchId: string;
}
