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
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable: true,
      minWidth: 150
    },
    {
      headerName: 'Appraisal Value',
      field: 'appraisalValue',
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

  ngOnInit(): void {
    this.loadGroups();
    if(!this.globalService.getIsLockDesk()){
      this.mloUserName = this.authService.getUserEmail();
      this.loadLoansFromLendingpad();
      this.loadUserMLO();
    }else{
      this.loadBrokerCompany();
    }
    this.brokercompanyId='-1';
    this.mloUserName='-1';


  }

  loadUserMLO(){
    this.quickQuoteService.getAllUserMLO().subscribe(allMLO =>{
      this.userMLOList = allMLO;
    })
  }
  loadLoansFromLendingpad(){
     this.lockDeskService.getLoanPipeline(this.mloUserName).subscribe(
      plist => {
        this.rowData = of(plist);
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
       this.emitAClickEvent();

      }
    )
  }

  loadGroups() {
    //based on the logged in users groups set the group
    if (this.authService.getGroups().filter(g => g === 'lockdesk')) {
      this.globalService.setIsLockDesk(true);
    }
  }

  loadBrokerCompany() {
    this.brokerCompanyLoading = true;
    this.quickQuoteService.getAllBrokerCompany().subscribe(c => {
      this.brokerCompanyList = c;
      this.brokerCompanyLoading = false;
      this.emitAClickEvent();
    })
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(['/lockdesk/lockdeskhome'])
  }
  getSelectedUserMLO() :UserMlo{
    return this.userMLOList.filter(user => user.userName === this.mloUserName).pop();
  }
  onRowClick($event: any) {
    this.router.navigate(['/lockdesk/lock-confirmation/' + this.loanPipelineGrid.rowData[$event.rowIndex].id+'/'+this.getSelectedUserMLO().userUUID]);
  }

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
    this.loanPipelineGrid.api.sizeColumnsToFit();
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
