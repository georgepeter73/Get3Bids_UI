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
  selector: 'app-investor-media',
  templateUrl: './investor-media.component.html',
  styleUrls: ['./investor-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class InvestorMediaComponent implements OnInit {
   newInvestorMediaSaveSuccess: boolean = false;

  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }
  newInvestor = new NewInvestor()
  errorMessage ="";
  loading = false;
  channelTypeTaxonomy : Taxonomy;
  channelType: string;
  newInvestors: NewInvestor[]=[];
  investorId: number;
  mediaLocations : MediaLocation[]=[];
  investorLogoType = "104";
  facamera = faCameraRetro;
  buttonPressed: boolean;


  ngOnInit(): void {
    this.getTaxonomy();
    this.newInvestor.channelType = parseInt(this.route.snapshot.paramMap.get('channel-type'));
    this.newInvestor.obInvestorId = parseInt(this.route.snapshot.paramMap.get('ob-investor-id'));
    this.getInvestorByChannelType(this.newInvestor.channelType);
    this.getMediaLocationByFormatType(this.investorLogoType);
  }
  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }

  getTaxonomy(){
    this.taxonomyService.getAllTaxonomies().subscribe(taxonomies => {
      this.channelTypeTaxonomy = taxonomies
        .filter(tax => tax.type === 'ChannelType')
        .pop();
    });
  }
  getInvestorByChannelType(channelType: number){
    this.newInvestorMediaSaveSuccess = false;
    this.quickQuoteService.getAllNewInvestorsByChannelType(channelType).subscribe(ni =>{
      this.newInvestors = ni;
      this.newInvestor = this.newInvestors.filter(i => i.obInvestorId == this.newInvestor.obInvestorId).pop();

    })
  }
  getMediaLocationByFormatType(formatType: string){
    this.newInvestorMediaSaveSuccess = false;
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

  saveInvestorMedia() {
    this.buttonPressed = true;
    this.newInvestorMediaSaveSuccess = false;
    const investorToSave = this.newInvestors.filter(ni => ni.obInvestorId === this.newInvestor.obInvestorId).pop();
    investorToSave.mediaId = this.newInvestor.mediaId;
    investorToSave.deleteFlag = 0;
    this.quickQuoteService.saveNewInvestorMedia(investorToSave).subscribe(newSave =>{
      this.buttonPressed = false;
      this.newInvestorMediaSaveSuccess= true;
    },error => {
      this.newInvestorMediaSaveSuccess= false;
      this.errorMessage = JSON.stringify(error);
    })


  }

  openExistingInvestorLogo(obInvestorId: number) {
    const selectedInvestor = this.newInvestors.filter(m => m.obInvestorId === obInvestorId).pop();
    const selectedInvestorsLogo = this.mediaLocations.filter(m => m.mediaId === selectedInvestor.mediaId).pop();
    if(selectedInvestorsLogo) {
      this.dialogService.open(MediaDialogComponent, {
        context: {
          title: 'Preview Window',
          videoURL: selectedInvestorsLogo.mediaURL,
        },
      });
    }
    else{
      console.log("No image available")
    }
  }
}
