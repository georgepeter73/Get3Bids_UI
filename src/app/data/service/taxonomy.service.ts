import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { Taxonomy } from '@data/schema/taxonomy';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map} from 'rxjs/operators';



const API_URL = environment.API_URL + '/api/v1/no-auth/taxonomy_group';

@Injectable({ providedIn: 'root' })
export class TaxonomyService  {
  private taxonomyCache: Observable<Taxonomy[]> = null;
  private payload: string;

  constructor(
    private http: HttpClient

  ) {}

  public getAllTaxonomies(): Observable<Taxonomy[]> {
       if (!this.taxonomyCache) {
        this.taxonomyCache = this.http
          .post(API_URL, this.payload, {
            params: new HttpParams().set('taxonomyGroup', '103')
          })
          .pipe(
            map(response => {
               return (<Object[]>response).map(
                taxonomy =>
                  new Taxonomy(
                    taxonomy['taxonomyId'],
                    taxonomy['taxonomyType'],
                    taxonomy['description'],
                    taxonomy['taxonomyItemDTO']
                  )
              );
            })
          );
      }

    return this.taxonomyCache;
  }
}
