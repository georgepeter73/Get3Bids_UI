import { Message } from '@data/schema/lockdesk//message';
import { QuickQuoteResults } from '@data/schema/lockdesk/quick-quote-results';
import {IneligibleProductResponse} from '@data/schema/lockdesk/ineligible-product-response';

export class QuickQuoteResultsRoot {
  obBestExResponseDTO: QuickQuoteResults;
  obBadRequestResponsDTO: Message[];
  obIneligibleResponseDTO : IneligibleProductResponse
  quoteId: number;
  success: boolean;
  constructor(
    obBestExResponseDTO?: QuickQuoteResults,
    obBadRequestResponsDTO?: Message[],
    obIneligibleResponseDTO? : IneligibleProductResponse,
    quoteId?: number,
    success?: boolean
  ) {
    this.obBestExResponseDTO = obBestExResponseDTO;
    this.quoteId = quoteId;
    this.obBadRequestResponsDTO = obBadRequestResponsDTO;
    this.success = success;
    this.obIneligibleResponseDTO = obIneligibleResponseDTO
  }
}
