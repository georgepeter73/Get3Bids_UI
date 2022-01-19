import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {TaxonomyService} from '@data/service/taxonomy.service';
import {MediaLocation} from '@data/schema/user/media-location';
import {BrokerCompanyInfo} from '@data/schema/company/broker-company-info';
import {BrokerCompanyMedia} from '@data/schema/company/broker-company-media';
import {MediaDialogComponent} from '@modules/admin/component/media-dialog/media-dialog.component';
import {faCameraRetro, faVideo} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-company-media',
  templateUrl: './company-media.component.html',
  styleUrls: ['./company-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CompanyMediaComponent implements OnInit {
  mediaLocations: MediaLocation[] = [];
  profilePhotomediaLocations: MediaLocation[] = [];
  brokerCompanyInfo : BrokerCompanyInfo = new BrokerCompanyInfo();
  companyMediaList: BrokerCompanyMedia[] = [];
  welcomeScreenUserMedia = new BrokerCompanyMedia();
  profileUserMedia = new BrokerCompanyMedia();
  buttonPressed = false;
  loading: any;
  errorMessage = '';
  video = faVideo;
  facamera = faCameraRetro;
  selectedMediaLocation: MediaLocation;
  selectedPhotoMediaLocation: MediaLocation;
  welcomeScreenVideoType = 101;
  profilePhotoType = 102;
  clearMessage = true;
  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router,
              private dialogService: NbDialogService,
              private taxonomyService: TaxonomyService) {
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this.router.navigate(["/admin/company-new/edit"]);
  }
  ngOnInit() {
    this.brokerCompanyInfo = JSON.parse(sessionStorage.getItem("brokerCompanyInfo"));
    this.quickQuoteService.getMediaLocationByFormatType('101').subscribe(res => {
      this.mediaLocations = res;
    })
    this.quickQuoteService.getMediaLocationByFormatType('102').subscribe(res => {
      this.profilePhotomediaLocations = res;
    })
    this.quickQuoteService.getCompanyMediaById(this.brokerCompanyInfo.brokercompanyId.toString()).subscribe(res =>
    {
      this.companyMediaList = res;
      this.welcomeScreenUserMedia = this.companyMediaList.filter(wel => wel.mediaType === this.welcomeScreenVideoType).pop();
      this.profileUserMedia = this.companyMediaList.filter(wel => wel.mediaType === this.profilePhotoType).pop();
      if(!this.welcomeScreenUserMedia){
        this.welcomeScreenUserMedia = new BrokerCompanyMedia();
      }
      if(!this.profileUserMedia){
        this.profileUserMedia = new BrokerCompanyMedia();
      }
    })

  }
  setMessageDelay() {
    const root = this;
    setTimeout(function(){
      root.buttonPressed = false;
    }, 2000);
  }
  openVideo() {
    this.selectedMediaLocation = this.mediaLocations.filter(m => m.mediaId === this.welcomeScreenUserMedia.mediaId).pop();
    this.buttonPressed = false;
    this.dialogService.open(MediaDialogComponent, {
      context: {
        title: 'Video Preview Window',
        videoURL: this.selectedMediaLocation.mediaURL,
      },
    });


  }
  mediaSelected() {
    if (this.welcomeScreenUserMedia.mediaId) {
      this.selectedMediaLocation = this.mediaLocations.filter(m => m.mediaId === this.welcomeScreenUserMedia.mediaId).pop();
    }
    this.buttonPressed = false;
  }

  photoSelected() {
    if (this.profileUserMedia.mediaId) {
      this.selectedPhotoMediaLocation = this.profilePhotomediaLocations.filter(m => m.mediaId === this.profileUserMedia.mediaId).pop();
    }
    this.buttonPressed = false;
  }

  openImage() {
    this.selectedPhotoMediaLocation = this.profilePhotomediaLocations.filter(m => m.mediaId === this.profileUserMedia.mediaId).pop();
    this.buttonPressed = false;
    this.dialogService.open(MediaDialogComponent, {
      context: {
        title: 'Preview Window',
        videoURL: this.selectedPhotoMediaLocation.mediaURL,
      },
    });
  }

  saveUserMedia() {
    this.clearMessage = true;
    this.buttonPressed = true;
    this.loading = true;
    if(!this.selectedMediaLocation) {
      this.selectedMediaLocation = this.mediaLocations.filter(m => m.mediaId === this.welcomeScreenUserMedia.mediaId).pop();
    }
    this.welcomeScreenUserMedia.mediaURL = this.selectedMediaLocation.mediaURL;
    this.welcomeScreenUserMedia.mediaDescription = this.selectedMediaLocation.mediaDescription;
    this.welcomeScreenUserMedia.deleteFlag = false;
    this.welcomeScreenUserMedia.lastUpdatedAt = new Date();
    this.welcomeScreenUserMedia.userId = this.brokerCompanyInfo.brokercompanyId;
    //making it null before save to avoid circular references
    this.brokerCompanyInfo.brokerCompanyMediaList = null;
    this.welcomeScreenUserMedia.brokerCompanyDTO = this.brokerCompanyInfo;
    this.welcomeScreenUserMedia.mediaType = this.welcomeScreenVideoType;

    this.quickQuoteService.saveBrokerCompanyMedia(this.welcomeScreenUserMedia).subscribe(
      res => {
        this.welcomeScreenUserMedia = res;
        this.loading = false;
        this.errorMessage = '';
        this.clearMessage = false;
        this.setMessageDelay();
      },
      error => {
        this.loading = false;
        this.errorMessage = error;
        this.clearMessage = false;
        this.setMessageDelay();
      }
    )


  }

  saveProfileUserMedia() {
    this.clearMessage = true;
    this.buttonPressed = true;
    this.loading = true;
    if(!this.selectedPhotoMediaLocation){
      this.selectedPhotoMediaLocation = this.profilePhotomediaLocations.filter(m => m.mediaId === this.profileUserMedia.mediaId).pop();
    }
    this.profileUserMedia.mediaURL = this.selectedPhotoMediaLocation.mediaURL;
    this.profileUserMedia.mediaDescription = this.selectedPhotoMediaLocation.mediaDescription;
    this.profileUserMedia.deleteFlag = false;
    this.profileUserMedia.lastUpdatedAt = new Date();
    this.profileUserMedia.userId = this.brokerCompanyInfo.brokercompanyId;
    //making it null before save to avoid circular references
    this.brokerCompanyInfo.brokerCompanyMediaList = null;
    this.profileUserMedia.brokerCompanyDTO = this.brokerCompanyInfo;
    this.profileUserMedia.mediaType = this.profilePhotoType;
    this.quickQuoteService.saveBrokerCompanyMedia(this.profileUserMedia).subscribe(
      res => {
        this.profileUserMedia = res;
        this.loading = false;
        this.errorMessage = '';
        this.clearMessage = false;
        this.setMessageDelay();
      },
      error => {
        this.loading = false;
        this.errorMessage = error;
        this.clearMessage = false;
        this.setMessageDelay();

      }
    )
  }

}
