import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {NewInvestor} from '@data/schema/new-investor';
import {Taxonomy} from '@data/schema/taxonomy';

@Component({
  selector: 'app-investor-new',
  templateUrl: './investor-new.component.html',
  styleUrls: ['./investor-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InvestorNewComponent implements OnInit {

  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }
  newInvestor = new NewInvestor()
  errorMessage ="";
  loading = false;
  ngOnInit(): void {

  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }
  saveNewInvestor(){
    this.errorMessage = "";
    this.loading = true;
    this.quickQuoteService.saveNewInvestor(this.newInvestor).subscribe(result =>{
      this.errorMessage = "Operation Completed Successfully..."
      setTimeout(()=> {
        this.errorMessage = "";
        this.loading = false
        this.router.navigate(["/admin/investor-pricing"]);
      },1000)
    },error => {
      this.errorMessage = "Operation Failed..."
      this.loading = false;
    })
  }

}
