import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {QuickQuoteResultsRoot} from '@data/schema/lockdesk/quick-quote-results-root';
import {map} from 'rxjs/operators';
import {QuickQuote} from '@data/schema/lockdesk';
import {environment} from '@env';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
const API_URL = environment.QUICK_PRICER_API_URL;
@Injectable()
export class QuickpricingService {
  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };
  requestOptions = {
    headers: new HttpHeaders(this.headerDict)
  };
  private payload: any ;

  constructor(
    private http: HttpClient
  ) {
  }

  public getQuoteResults(
    qq : QuickQuote
  ): Observable<QuickQuoteResultsRoot> {
    return this.http
      .post(API_URL + '/api/v1/quickpricer/get_quote_results' , this.payload, {
        params: new HttpParams().set('quoteDTO', JSON.stringify(qq))
      })
      .pipe(
        map(qqResRoot => {
          return new QuickQuoteResultsRoot(
            qqResRoot['obBestExResponseDTO'],
            qqResRoot['obBadRequestResponsDTO'],
            qqResRoot['obIneligibleResponseDTO'],
            qqResRoot['quoteId'],
            qqResRoot['success']
          );
        })
      );
  }

}
