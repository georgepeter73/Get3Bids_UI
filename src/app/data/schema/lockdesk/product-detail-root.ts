import { ProductDetail } from '@data/schema/lockdesk/product-detail';
import { Message } from '@data/schema/lockdesk/message';
import {UserMlo} from '@data/schema/user/user-mlo';


export class ProductDetailRoot {
  product_detail: ProductDetail;
  quoteId: number;
  messages: Message[];
  success: boolean;
  userMLO: UserMlo;
  constructor(
    product_detail: ProductDetail,
    quoteId: number,
    messages: Message[],
    success: boolean,
    userMLO: UserMlo
  ) {
    this.product_detail = product_detail;
    this.quoteId = quoteId;
    this.messages = messages;
    this.success = success;
    this.userMLO = userMLO;
  }
}
