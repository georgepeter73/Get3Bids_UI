import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {AgGridAngular} from '@ag-grid-community/angular';
import {LockDeskService} from '@data/service/lockdesk.service';
import {of} from 'rxjs';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {GlobalService} from '@app/service/global.service';
import {AuthService} from '@app/service/auth.service';
import {UserMlo} from '@data/schema/user/user-mlo';

@Component({
  selector: 'app-loan-pipeline',
  templateUrl: './loan-pipeline.component.html',
  styleUrls: ['./loan-pipeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoanPipelineComponent implements OnInit {

  constructor(private router: Router,
              private _location: Location,
              private lockDeskService: LockDeskService, private taxonomyService: TaxonomyService,
              private quickQuoteService: QuickQuoteService,
              public globalService: GlobalService,
              private authService: AuthService,
  ) {
  }

  searchValue: any;
  cart = faUser;
  rowData: any;
  brokerCompanyList: BrokerCompanyInfo[] = [];
  brokerCompanyLoading = false;
  @ViewChild('grid') loanPipelineGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: 'Loan #',
      field: 'loanNumber',
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Borrower Name',
      field: 'borrower.firstName',
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Loan Amount',
      field: 'loanAmount',
      valueFormatter: params => this.currencyFormatter(params.data.loanAmount, '$'),
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Appraisal Value',
      field: 'appraisalValue',
      valueFormatter: params => this.currencyFormatter(params.data.appraisalValue, '$'),
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Purpose',
      field: 'purpose.name',
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Loan Type',
      field: 'loanType.name',
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Property Type',
      field: 'propertyType.name',
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
  ];
  brokercompanyId: any;
  userMLOList: UserMlo[] = [];
  userUUID: any;
  mloUserName: any;
  userLoading: any;
  showTheGrid = false;
  loadingGridData= false;
  currencyFormatter(currency, sign) {
    var sansDec = Number(currency).toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
   }

  ngOnInit(): void {
    this.showTheGrid = false;
    if(this.globalService.getIsMLO()){
       //scenario were mlo's are logged into the system
      this.mloUserName = this.authService.getUserEmail();
      this.loadLoansFromLendingpad();
     }else{
      this.loadBrokerCompany();
      //scenario were lock desk user loggs in the mloUserName is selected by the lock desk user .
    }
    this.brokercompanyId = this.globalService.getSelectedBrokerCompanyId() != null? this.globalService.getSelectedBrokerCompanyId():'-1'
    this.mloUserName = this.globalService.getSelectedUserMLOUsername()!=null ? this.globalService.getSelectedUserMLOUsername():'-1'
    this.userMLOList = this.globalService.getUserMLOs() != null ? this.globalService.getUserMLOs() : [];
    if(this.mloUserName != '-1'){
      this.loadLoansFromLendingpad();
    }

  }
  loadLoansFromLendingpad(){
    this.showTheGrid = true;
    this.loadingGridData = true;
     this.lockDeskService.getLoanPipeline(this.mloUserName).subscribe(
      plist => {
        this.rowData = of(plist);
        this.loadingGridData = false;
        this.emitAClickEvent();
        setTimeout(() => {
          this.loanPipelineGrid.api.sizeColumnsToFit()
        }, 50);
      },
      error => {
        console.error(error)
      }
    );
  }

  emitAClickEvent() {
    //hack for data not displaying with out a mouse click
    this.eventFire(document.getElementById('refreshButtonId'), 'click');
  }

  loadUsers() {
    this.userLoading = true;
    this.quickQuoteService.getAllUserMLOByBrokerCompanyid(this.brokercompanyId).subscribe(users => {
       this.userMLOList = users;
       this.userLoading = false;
       this.globalService.setUserMLOs(users)
       this.emitAClickEvent();

      }
    )
  }



  loadBrokerCompany() {
    this.brokerCompanyLoading = true;
    if(!this.globalService.getBrokerCompanyInfos()) {
      this.quickQuoteService.getAllBrokerCompany().subscribe(c => {
        this.brokerCompanyList = c;
        this.brokerCompanyLoading = false;
        this.globalService.setBrokerCompanyInfos(c);
        this.emitAClickEvent();
      })
    }else{
      this.brokerCompanyLoading = false;
      this.brokerCompanyList = this.globalService.getBrokerCompanyInfos();
    }
    this.loadingGridData = false;
  }

  backClicked($event: MouseEvent) {
    this.globalService.setSelectedBrokerCompanyId(this.brokercompanyId)
    this.globalService.setLockLoanNavStarter("loan-pipeline");
    this.globalService.setSelectedUserMLOUsername(this.mloUserName)
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }
  getSelectedUserMLO($event: any) :UserMlo{
    if(this.globalService.getIsMLO()){
      return this.globalService.getLoggedInUser();
    }else {
      //get the loan officer email from the loan info. should not get from the login information
      return this.userMLOList.filter(user => user.userName === $event.data.loanOfficer.email).pop();
    }
  }
  onRowClick($event: any) {
    const userMLO = this.getSelectedUserMLO($event);
    this.globalService.setSelectedBrokerCompanyId(this.brokercompanyId)
    this.globalService.setLockLoanNavStarter("loan-pipeline");
    this.globalService.setSelectedUserMLOUsername(this.mloUserName)
    this.router.navigate(['/lockdesk/lock-confirmation/' + $event.data.loanNumber + '/' + userMLO.userUUID]);
  }

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
    if(this.loanPipelineGrid) {
      this.loanPipelineGrid.api.sizeColumnsToFit();
    }
  }

  eventFire(el, etype) {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
