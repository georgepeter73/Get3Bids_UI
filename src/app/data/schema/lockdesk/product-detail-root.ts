import { ProductDetail } from '@data/schema/lockdesk/product-detail';
import { Message } from '@data/schema/lockdesk/message';
import { UserMLO } from '@data/schema/lockdesk/user-mlo';

export class ProductDetailRoot {
  product_detail: ProductDetail;
  quoteId: number;
  messages: Message[];
  success: boolean;
  userMLO: UserMLO;
  constructor(
    product_detail: ProductDetail,
    quoteId: number,
    messages: Message[],
    success: boolean,
    userMLO: UserMLO
  ) {
    this.product_detail = product_detail;
    this.quoteId = quoteId;
    this.messages = messages;
    this.success = success;
    this.userMLO = userMLO;
  }
}
