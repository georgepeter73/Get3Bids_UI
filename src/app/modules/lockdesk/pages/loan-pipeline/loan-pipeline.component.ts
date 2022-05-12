import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {Taxonomy} from '@data/schema/taxonomy';
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
  channelTypeTaxonomy : Taxonomy = null;
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
   ];

  ngOnInit(): void {
    this.lockDeskService.getLoanPipeline("tibor.benke@loanhouse.us").subscribe(
      plist => {
        alert(JSON.stringify(plist))
        this.rowData = of(plist);
      },
      error => {
        console.error(error)
      }
    );
  }
  backClicked($event: MouseEvent) {

  }

  newBrokerCompany() {

  }
}
