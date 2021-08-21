import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AgGridAngular} from '@ag-grid-community/angular';
import {of} from 'rxjs';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MediaListComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,) { }
  cart = faUser;
  searchValue: any;
  rowData: any;
  @ViewChild("grid") mediaGrid: AgGridAngular;
  columnDefs = [
    {
      headerName: "ID",
      field: "mediaId",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },
    {
      headerName: "Description",
      field: "mediaDescription",
      sortable: true,
      filter: true,
      checkboxSelection: false
    },

    {
      headerName: "Location",
      field: "mediaURL",
      sortable: true,
      filter: true,
      checkboxSelection: false,

    },
    {
      headerName: "Date",
      field: "lastUpdatedAt",
      sortable: true,
      filter: true,
      checkboxSelection: false,

    },


  ];


  ngOnInit(): void {
    this.quickQuoteService.getAllMediaLocation().subscribe(
      mediaList => {
        mediaList.sort((a, b) => (a.lastUpdatedAt > b.lastUpdatedAt ? -1 : 1));
           this.rowData = of(mediaList);
      },
      error => {
        console.error(error)
      }
    );
  }

  uploadMedia() {
    this.router.navigate(["/admin/upload-media"]);
  }

  backClicked($event: MouseEvent) {

  }

  onRowClick($event: any) {

  }
}
