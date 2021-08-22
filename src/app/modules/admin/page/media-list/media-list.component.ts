import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, LOCALE_ID} from '@angular/core';
import { faUser} from "@fortawesome/free-solid-svg-icons";
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {AgGridAngular} from '@ag-grid-community/angular';
import {of} from 'rxjs';
import {MediaShowButtonComponent} from '@modules/admin/component/media-show-button/media-show-button.component';
import {NbDialogService} from '@nebular/theme';
import {MediaDialogComponent} from '@modules/admin/component/media-dialog/media-dialog.component';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MediaListComponent implements OnInit {

  constructor(public quickQuoteService : QuickQuoteService,

              private router: Router, private _location: Location,private dialogService: NbDialogService,
              @Inject(LOCALE_ID) public locale: string) {

  }
  frameworkComponents: any;
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
      headerName: "Date",
      field: "lastUpdatedAt",
      sortable: true,
      filter: true,
      checkboxSelection: false,
     cellRenderer: (data) => {
       return data.value ? formatDate(data.value, 'd MMM yyyy', this.locale) : '';
     }

    },
    {
      headerName: "",
      field: "mediaURL",
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: function(field: any) {
          alert(`${field} was clicked`);
        }
      },
      minWidth: 150
    },


  ];



  ngOnInit(): void {
    this.frameworkComponents = {
      btnCellRenderer: MediaShowButtonComponent
    };
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
    this.router.navigate(["/admin/upload-media/create"]);
  }

  backClicked($event: MouseEvent) {

  }

  onRowClick($event: any) {
    sessionStorage.setItem('mediaLocation', JSON.stringify(this.mediaGrid.api.getSelectedRows()[0]));
    this.router.navigate(["/admin/upload-media/edit"]);
  }


}
