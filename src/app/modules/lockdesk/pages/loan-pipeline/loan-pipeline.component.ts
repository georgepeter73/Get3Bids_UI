import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {AgGridAngular} from '@ag-grid-community/angular';
import {LockDeskService} from '@data/service/lockdesk.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-loan-pipeline',
  templateUrl: './loan-pipeline.component.html',
  styleUrls: ['./loan-pipeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoanPipelineComponent implements OnInit {

  constructor(private router: Router,
              private _location: Location,
              private lockDeskService : LockDeskService
  ) { }
  searchValue: any;
  cart = faUser;
  rowData: any;
   @ViewChild("grid") loanPipelineGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "Loan #",
      field: "loanNumber",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Borrower Name",
      field: "borrower.firstName",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Loan Amount",
      field: "loanAmount",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Appraisal Value",
      field: "appraisalValue",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Purpose",
      field: "purpose.name",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
    {
      headerName: "Loan Type",
      field: "loanType.name",
      sortable: true,
      filter: true,
      checkboxSelection: false,
      resizable : true,
      minWidth: 150
    },
   ];

  ngOnInit(): void {
    this.lockDeskService.getLoanPipeline("tibor.benke@loanhouse.us").subscribe(
      plist => {
        this.rowData = of(plist);
        //hack for data not displaying with out a mouse click
        this.eventFire(document.getElementById('refreshButtonId'), 'click');
        setTimeout(()=>{this.loanPipelineGrid.api.sizeColumnsToFit()}, 50);
      },
      error => {
         console.error(error)
      }
    );
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/lockdesk/lockdeskhome"])
  }



  onRowClick($event: any) {
     this.router.navigate(["/lockdesk/lock-confirmation/"+this.loanPipelineGrid.rowData[0].id]);
  }

  refreshGrid($event: MouseEvent) {
    $event.preventDefault();
    this.loanPipelineGrid.api.sizeColumnsToFit();
  }
  eventFire(el, etype){
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      var evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
