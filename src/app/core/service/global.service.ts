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
import { BrokerCompanyMedia } from '@data/schema/lockdesk/broker-company-media';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {LoanInfo} from '@data/schema/lockdesk/loan-info';
import {UserMedia} from '@data/schema/user/user-media';
import {UserMlo} from '@data/schema/user/user-mlo';
import {Taxonomy} from '@data/schema/taxonomy';

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
    this.productGroupMapping();
    this.productGrouping();
    this.loanTypeListMapping();
  }

  productGroupMapping() {
    this.productFilterList[0] = { key: '101', value: '30-Year Fixed' };
    this.productFilterList[1] = { key: '102', value: '25-Year Fixed' };
    this.productFilterList[2] = { key: '103', value: '15-Year Fixed' };
    this.productFilterList[3] = { key: '104', value: 'ARM' };
    this.productFilterList[4] = { key: '105', value: 'ARM' };
    this.productFilterList[5] = { key: '106', value: 'ARM' };
  }

  loanTypeListMapping() {
    this.loanTypeList[0] = { key: 'FHA', value: 'FHA' };
    this.loanTypeList[1] = { key: 'Conforming', value: 'Conforming' };
    this.loanTypeList[2] = { key: 'NonConforming', value: 'NonConforming' };
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
    this.productGroup.set('104', new ProductGroup(30, 'ARM', 'ARM'));
    this.productGroup.set('105', new ProductGroup(25, 'ARM', 'ARM'));
    this.productGroup.set('106', new ProductGroup(15, 'ARM', 'ARM'));
  }
  setWelcomeFlag(welcomeFlag: string) {
    sessionStorage.setItem('welcome_flag', JSON.stringify(welcomeFlag));
  }
  setLoggedInUser(user: UserMlo) {
    localStorage.setItem('userMLO', JSON.stringify(user));
  }
  setLOUUID(loUUID: string) {
    sessionStorage.setItem('loUUID', JSON.stringify(loUUID));
  }
  setCampaignType(campaignType: string) {
    sessionStorage.setItem('campaignType', JSON.stringify(campaignType));
  }
  setSelectedBrokerCompanyId(id: string) {
    sessionStorage.setItem('brokerCompanyId', JSON.stringify(id));
  }
  setSelectedUserMLOUsername(id: string) {
    sessionStorage.setItem('userMLOName', JSON.stringify(id));
  }
  getSelectedUserMLOUsername(): Taxonomy {
    return JSON.parse(sessionStorage.getItem('userMLOName'));
  }
  getSelectedBrokerCompanyId(): Taxonomy {
    return JSON.parse(sessionStorage.getItem('brokerCompanyId'));
  }
  setVideoTaxonomy(videoTaxonomy: Taxonomy) {
    sessionStorage.setItem('videoTaxonomy', JSON.stringify(videoTaxonomy));
  }
  setSelectedChannelType(params: string) {
    sessionStorage.setItem('channelType', JSON.stringify(params));
  }
  getVideoTaxonomy(): Taxonomy {
    return JSON.parse(sessionStorage.getItem('videoTaxonomy'));
  }
  getSelectedChannelType(): string {
    return JSON.parse(sessionStorage.getItem('channelType'));
  }
  getLoggedInUser(): UserMlo {
    return JSON.parse(localStorage.getItem('userMLO'));
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
  setQQRes(quickQuoteResults: QuickQuoteResults) {
    sessionStorage.setItem('quickQuoteResults', JSON.stringify(quickQuoteResults));
  }
  getQQRes(): QuickQuoteResults {
    if (JSON.parse(sessionStorage.getItem('quickQuoteResults')) == null) {
      return new QuickQuoteResults();
    }
    return JSON.parse(sessionStorage.getItem('quickQuoteResults'));
  }

  setQuickQuote(quickQuote: QuickQuote) {
    this.quickQuote.next(quickQuote);
    sessionStorage.setItem('quickQuote', JSON.stringify(this.quickQuote.value));
  }
  setRQSelectedLoanInfo(loanInfo: LoanInfo) {
    sessionStorage.setItem('loanInfo', JSON.stringify(loanInfo));
  }
  getRQSelectedLoanInfo() {
    return JSON.parse(sessionStorage.getItem('loanInfo'));
  }
  setLockLoanNavStarter(lockLoanNavStarter: string) {
    sessionStorage.setItem('LockLoanNavStarter', JSON.stringify(lockLoanNavStarter));
  }
  getLockLoanNavStarter() {
    return JSON.parse(sessionStorage.getItem('LockLoanNavStarter'));
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
  setIsLockDesk(lockDesk: boolean) {
    sessionStorage.setItem('isLockDesk', lockDesk.toString());
  }
  setIsMLO(lockDesk: boolean) {
    sessionStorage.setItem('isMLO', lockDesk.toString());
  }
  setIsLockDeskLimited(lockDesk: boolean) {
    sessionStorage.setItem('isLockDeskLimited', lockDesk.toString());
  }
  getIsLockDesk(): boolean {
    return JSON.parse(sessionStorage.getItem('isLockDesk').toLowerCase());
  }
  getIsMLO(): boolean {
    return JSON.parse(sessionStorage.getItem('isMLO').toLowerCase());
  }
  getIsLockDeskLimited(): boolean {
    return JSON.parse(sessionStorage.getItem('isLockDeskLimited').toLowerCase());
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
  setUserMLOs(userMLOs: UserMlo[]) {
    sessionStorage.setItem('userMLOs', JSON.stringify(userMLOs));
  }
  setBrokerCompanyInfos(brokerCompanyInfos: BrokerCompanyInfo[]) {
    sessionStorage.setItem('brokerCompanyInfos', JSON.stringify(brokerCompanyInfos));
  }
  getBrokerCompanyInfos(): BrokerCompanyInfo[] {
    return JSON.parse(sessionStorage.getItem('brokerCompanyInfos'));
  }
  getUserMLOs(): UserMlo[] {
     return JSON.parse(sessionStorage.getItem('userMLOs'));
  }
  setUserMLO(userMLO: UserMlo) {
    sessionStorage.setItem('userMLO', JSON.stringify(userMLO));
  }
  getUserMLO(): UserMlo {
    if (JSON.parse(sessionStorage.getItem('userMLO')) == null) {
      return new UserMlo();
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
