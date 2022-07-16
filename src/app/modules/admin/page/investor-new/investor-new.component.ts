import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {NewInvestor} from '@data/schema/new-investor';
import {Taxonomy} from '@data/schema/taxonomy';
import {MediaLocation} from '@data/schema/user/media-location';
import {MediaDialogComponent} from '@modules/admin/component/media-dialog/media-dialog.component';
import {faCameraRetro, faVideo} from '@fortawesome/free-solid-svg-icons';
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
  channelTypeTaxonomy : Taxonomy;
  mediaLocations : MediaLocation[]=[];
  investorLogoType = "104";
  facamera = faCameraRetro;
  channelTypes =[];
  ngOnInit(): void {
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
    });
    this.getMediaLocationByFormatType(this.investorLogoType)
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }
  getMediaLocationByFormatType(formatType: string){
    this.quickQuoteService.getMediaLocationByFormatType(formatType).subscribe(ml =>{
      this.mediaLocations = ml;
    })
  }
  openInvestorLogo() {
    const selectedInvestorLogo = this.mediaLocations.filter(m => m.mediaId === this.newInvestor.mediaId).pop();
    this.dialogService.open(MediaDialogComponent, {
      context: {
        title: 'Preview Window',
        videoURL: selectedInvestorLogo.mediaURL,
      },
    });
  }
  saveNewInvestor(){
    this.errorMessage = "";
    this.loading = true;
     this.quickQuoteService.saveNewInvestor(this.newInvestor).subscribe(result =>{
        this.errorMessage = "Operation Completed Successfully..."
        this.loading = false;
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
