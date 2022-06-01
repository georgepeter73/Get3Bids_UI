import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import {
  KeyValuePair,
  QuickQuote,
  QuickQuoteResults,
} from '@data/schema/lockdesk';
import { QuickQuoteResultsRoot } from '@data/schema/lockdesk/quick-quote-results-root';
import { NewLoanResponse } from '@data/schema/lockdesk/new-loan-respons';
import { transaction } from '@data/schema/lockdesk/quote-constants';
import { Investor } from '@data/schema/lockdesk/investor';
import { ProductGroup } from '@data/schema/lockdesk/productgroup';
import { Router } from '@angular/router';
import { QuoteBorrowerInfo } from '@data/schema/lockdesk/quote-borrower-info';
import { UserMedia } from '@data/schema/lockdesk/user-media';
import { UserMLO } from '@data/schema/lockdesk/user-mlo';
import { BrokerCompanyMedia } from '@data/schema/lockdesk/broker-company-media';
import { BrokerCompanyInfo } from '@data/schema/lockdesk/broker-company-info';
import {Taxonomy} from '@data/schema/lockdesk/taxonomy';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private quickQuote: BehaviorSubject<QuickQuote>;
  private quoteBorrowerInfo: QuoteBorrowerInfo;
  private quickQuoteResults: BehaviorSubject<QuickQuoteResults>;
  private quickQuoteResultsRoot: BehaviorSubject<QuickQuoteResultsRoot>;
  private newLoanResponse: BehaviorSubject<NewLoanResponse>;
  private welcomeFlag: string;
  private loUUID: string;
  globalQQ: QuickQuote;
  investorNameMap = new Map();
  productFilterList: KeyValuePair[] = [];
  loanTypeList: KeyValuePair[] = [];
  productGroup = new Map();

  constructor() {
    this.quickQuote = new BehaviorSubject<QuickQuote>(
      JSON.parse(sessionStorage.getItem('quickQuote'))
    );
    this.quickQuoteResults = new BehaviorSubject<QuickQuoteResults>(
      JSON.parse(sessionStorage.getItem('quickQuoteResults'))
    );
    this.quickQuoteResultsRoot = new BehaviorSubject<QuickQuoteResultsRoot>(
      JSON.parse(sessionStorage.getItem('quickQuoteResultsRoot'))
    );
    this.newLoanResponse = new BehaviorSubject<NewLoanResponse>(
      JSON.parse(sessionStorage.getItem('newLoanResponse'))
    );
    this.welcomeFlag = JSON.parse(sessionStorage.getItem('welcome_flag'));
    this.investorNameMapping();
    this.productGroupMapping();
    this.productGrouping();
    this.loanTypeListMapping();
  }

  investorNameMapping() {
    this.investorNameMap.set(
      106827,
      new Investor('e2lending', 106827, 411341, 1234, 4)
    );
    this.investorNameMap.set(
      106844,
      new Investor('uwm', 106844, 3038, 1234, 5)
    );
    this.investorNameMap.set(
      107600,
      new Investor('firstguaranty', 107600, 2917, 1234, 4.5)
    );
    this.investorNameMap.set(
      106846,
      new Investor('quicken', 106846, 3030, 1234, 4.5)
    );

    this.investorNameMap.set(
      107018,
      new Investor('carrington', 107018, 2600, 1234, 4)
    );
    this.investorNameMap.set(
      107596,
      new Investor('homebridge', 107596, 6521, 1234, 4.5)
    );
    this.investorNameMap.set(
      107671,
      new Investor('franklin-america', 107671, 433960, 1234, 4)
    );
    this.investorNameMap.set(
      111296,
      new Investor('luxury-mortgage', 111296, 2745, 1234, 4)
    );
    this.investorNameMap.set(
      113915,
      new Investor('rocket-mortgage', 113915, 3030, 1234, 4.5)
    );
    this.investorNameMap.set(
      117697,
      new Investor('arc-home', 117697, 81386, 1234, 4)
    );
    this.investorNameMap.set(
      1234,
      new Investor('reliant-bank', 126071, 527661, 1234, 4)
    );
    this.investorNameMap.set(
      132820,
      new Investor('pennymac', 132820, 35953, 1234, 5)
    );
    this.investorNameMap.set(
      132847,
      new Investor('amerihome', 132847, 135776, 1234, 5)
    );
    this.investorNameMap.set(
      133131,
      new Investor('fgmc', 133131, 2917, 1234, 5)
    );
    this.investorNameMap.set(
      133197,
      new Investor('homepoint', 133197, 7706, 1234, 5)
    );
    this.investorNameMap.set(
      133604,
      new Investor('famc', 133604, 433960, 1234, 5)
    );
  }

  productGroupMapping() {
    this.productFilterList[0] = { key: '101', value: '30-Year Fixed' };
    this.productFilterList[1] = { key: '102', value: '25-Year Fixed' };
    this.productFilterList[2] = { key: '103', value: '15-Year Fixed' };
    this.productFilterList[3] = { key: '104', value: '5/1 ARM' };
    this.productFilterList[4] = { key: '105', value: '7/1 ARM' };
    this.productFilterList[5] = { key: '106', value: '10/1 ARM' };
  }

  loanTypeListMapping() {
    this.loanTypeList[0] = { key: 'FHA', value: 'FHA' };
    this.loanTypeList[1] = { key: 'Conforming', value: 'Conforming' };
    this.loanTypeList[2] = { key: 'Nonconforming', value: 'Nonconforming' };
    this.loanTypeList[3] = { key: 'VA', value: 'VA' };
    this.loanTypeList[4] = { key: 'SecondMortgage', value: 'SecondMortgage' };
    this.loanTypeList[5] = { key: 'Conventional', value: 'Conventional' };
    this.loanTypeList[6] = { key: 'HomeEquity', value: 'HomeEquity' };
    this.loanTypeList[7] = {
      key: 'USDA Rural Housing',
      value: 'USDA Rural Housing'
    };
  }
  productGrouping() {
    this.productGroup.set('101', new ProductGroup(30, 'Fixed', '30'));
    this.productGroup.set('102', new ProductGroup(25, 'Fixed', '25'));
    this.productGroup.set('103', new ProductGroup(15, 'Fixed', '15'));
    this.productGroup.set('104', new ProductGroup(30, 'ARM', '5/1'));
    this.productGroup.set('105', new ProductGroup(30, 'ARM', '7/1'));
    this.productGroup.set('106', new ProductGroup(30, 'ARM', '10/1'));
  }
  setWelcomeFlag(welcomeFlag: string) {
    sessionStorage.setItem('welcome_flag', JSON.stringify(welcomeFlag));
  }
  setLOUUID(loUUID: string) {
    sessionStorage.setItem('loUUID', JSON.stringify(loUUID));
  }
  setCampaignType(campaignType: string) {
    sessionStorage.setItem('campaignType', JSON.stringify(campaignType));
  }
  setVideoTaxonomy(videoTaxonomy: Taxonomy) {
    sessionStorage.setItem('videoTaxonomy', JSON.stringify(videoTaxonomy));
  }
  getVideoTaxonomy(): Taxonomy {
    return JSON.parse(sessionStorage.getItem('videoTaxonomy'));
  }

  getWelcomeFlag(): string {
    if (JSON.parse(sessionStorage.getItem('welcome_flag')) == null) {
      return 'false';
    } else {
      return JSON.parse(sessionStorage.getItem('welcome_flag'));
    }
  }
  getLOUUID(): string {
    if (JSON.parse(sessionStorage.getItem('loUUID')) == null) {
      return '';
    } else {
      return JSON.parse(sessionStorage.getItem('loUUID'));
    }
  }
  getCampaignType(): string {
    if (JSON.parse(sessionStorage.getItem('campaignType')) == null) {
      return '';
    } else {
      return JSON.parse(sessionStorage.getItem('campaignType'));
    }
  }

  setQuickQuote(quickQuote: QuickQuote) {
    this.quickQuote.next(quickQuote);
    sessionStorage.setItem('quickQuote', JSON.stringify(this.quickQuote.value));
  }

  getQuickQuote(): Observable<QuickQuote> {
    if (JSON.parse(sessionStorage.getItem('quickQuote')) == null) {
      this.quickQuote = new BehaviorSubject<QuickQuote>(new QuickQuote());
    }
    return this.quickQuote;
  }
  setMLOFlag(userFlag: string) {
    sessionStorage.setItem('isUser', userFlag);
  }
  setBrokerCompany(brokerCompanyInfo: BrokerCompanyInfo) {
    sessionStorage.setItem('brokerCompany', JSON.stringify(brokerCompanyInfo));
  }
  getBrokerCompany(): BrokerCompanyInfo {
    return JSON.parse(sessionStorage.getItem('brokerCompany'));
  }
  getMLOFlag(): string {
    return sessionStorage.getItem('isUser');
  }
  setUserMedia(userMedia: UserMedia[]) {
    sessionStorage.setItem('userMedias', JSON.stringify(userMedia));
  }
  setCompanyMedias(companyMedia: BrokerCompanyMedia[]) {
    sessionStorage.setItem('companyMedias', JSON.stringify(companyMedia));
  }
  getCompanyMedias(): BrokerCompanyMedia[] {
    if (JSON.parse(sessionStorage.getItem('companyMedias')) == null) {
      return [];
    }
    return JSON.parse(sessionStorage.getItem('companyMedias'));
  }

  getUserMedias(): UserMedia[] {
    if (JSON.parse(sessionStorage.getItem('userMedias')) == null) {
      return [];
    }
    return JSON.parse(sessionStorage.getItem('userMedias'));
  }
  setUserMLO(userMLO: UserMLO) {
    sessionStorage.setItem('userMLO', JSON.stringify(userMLO));
  }
  getUserMLO(): UserMLO {
    if (JSON.parse(sessionStorage.getItem('userMLO')) == null) {
      return new UserMLO();
    }
    return JSON.parse(sessionStorage.getItem('userMLO'));
  }
  setBorrowerInfo(quoteBorrowerInfo: QuoteBorrowerInfo) {
    sessionStorage.setItem(
      'quoteBorrowerInfo',
      JSON.stringify(quoteBorrowerInfo)
    );
  }

  getBorrowerInfo(): QuoteBorrowerInfo {
    if (JSON.parse(sessionStorage.getItem('quoteBorrowerInfo')) == null) {
      const quoteBorrowerInfo = new QuoteBorrowerInfo();
      quoteBorrowerInfo.firstName = '';
      return quoteBorrowerInfo;
    }
    return JSON.parse(sessionStorage.getItem('quoteBorrowerInfo'));
  }
  setBorrowerInfoSkip(borrowerInfoSkipFlag: boolean) {
    sessionStorage.setItem(
      'borrowerInfoSkipFlag',
      JSON.stringify(borrowerInfoSkipFlag)
    );
  }

  getBorrowerInfoSkip(): boolean {
    if (JSON.parse(sessionStorage.getItem('borrowerInfoSkipFlag')) == null) {
      return false;
    }
    return JSON.parse(sessionStorage.getItem('borrowerInfoSkipFlag'));
  }

  setQuickQuoteResults(quickQuoteResults: QuickQuoteResults) {
    this.quickQuoteResults.next(quickQuoteResults);
    sessionStorage.setItem(
      'quickQuoteResults',
      JSON.stringify(this.quickQuoteResults.value)
    );
  }
  clearQuickQuoteStorage() {
    sessionStorage.removeItem('quickQuote');
    sessionStorage.removeItem('quickQuoteResultsRoot');
    sessionStorage.removeItem('newLoanResponse');
    sessionStorage.removeItem('quickQuoteResults');
  }

  setNewLoanResponse(newLoanResponse: NewLoanResponse) {
    this.newLoanResponse.next(newLoanResponse);
    sessionStorage.setItem(
      'newLoanResponse',
      JSON.stringify(this.newLoanResponse.value)
    );
  }
  getNewLoanResponse(): Observable<NewLoanResponse> {
    if (JSON.parse(sessionStorage.getItem('newLoanResponse')) == null) {
      this.newLoanResponse = new BehaviorSubject<NewLoanResponse>(
        new NewLoanResponse()
      );
    }
    return this.newLoanResponse;
  }

  setQuickQuoteResultsRoot(quickQuoteResultsRoot: QuickQuoteResultsRoot) {
    this.quickQuoteResultsRoot.next(quickQuoteResultsRoot);
    sessionStorage.setItem(
      'quickQuoteResultsRoot',
      JSON.stringify(this.quickQuoteResultsRoot.value)
    );
  }
  getQuickQuoteResultsRoot(): Observable<QuickQuoteResultsRoot> {
    if (JSON.parse(sessionStorage.getItem('quickQuoteResultsRoot')) == null) {
      this.quickQuoteResultsRoot = new BehaviorSubject<QuickQuoteResultsRoot>(
        new QuickQuoteResultsRoot()
      );
    }
    return this.quickQuoteResultsRoot;
  }

  getQuickQuoteResults(): Observable<QuickQuoteResults> {
    if (JSON.parse(sessionStorage.getItem('quickQuoteResults')) == null) {
      this.quickQuoteResults = new BehaviorSubject<QuickQuoteResults>(
        new QuickQuoteResults()
      );
    }
    return this.quickQuoteResults;
  }

  isMIMandatory(): boolean {
    this.getQuickQuote().subscribe(quickQuote => {
      this.globalQQ = quickQuote;
    });
    if (
      (this.globalQQ.transactionType === transaction.PURCHASE &&
        (this.globalQQ.govtLoan || this.globalQQ.loanToValue <= 80)) ||
      (this.globalQQ.loanToValue <= 80 &&
        (this.globalQQ.transactionType === transaction.REFINANCE ||
          this.globalQQ.transactionType === transaction.REFINANCE_CASH_OUT))
    ) {
      return false;
    } else return true;
  }
  isTaxAndEscrowsMandatory(): boolean {
    this.getQuickQuote().subscribe(quickQuote => {
      this.globalQQ = quickQuote;
    });
    if (this.globalQQ.loanToValue <= 80) {
      return true;
    } else return false;
  }
  investorName(investorId): Investor {
    return this.investorNameMap.get(investorId);
  }
  checkForWelcomeFlag(router: Router) {
    if (this.getWelcomeFlag() === 'false') {
      router.navigate(['/quickquote/welcome']);
    }
  }
  checkForBorrowerInfo(router: Router) {
    if (
      this.getBorrowerInfo().firstName === '' &&
      this.getBorrowerInfoSkip() === false
    ) {
      router.navigate(['/quickquote/borrower-info']);
    }
  }
}
