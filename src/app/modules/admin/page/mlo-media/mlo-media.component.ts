import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserMlo} from '@data/schema/user/user-mlo';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {UserMedia} from '@data/schema/user/user-media';
import {faVideo,faCameraRetro} from '@fortawesome/free-solid-svg-icons';
import {MediaLocation} from '@data/schema/user/media-location';
import {MediaDialogComponent} from '@modules/admin/component/media-dialog/media-dialog.component';
import {NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-mlo-media',
  templateUrl: './mlo-media.component.html',
  styleUrls: ['./mlo-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MloMediaComponent implements OnInit {


  constructor(public quickQuoteService: QuickQuoteService, private _location: Location,
              private route: ActivatedRoute, private router: Router, private dialogService: NbDialogService) {
  }

  userMLO: UserMlo = new UserMlo();
  userMediaList: UserMedia[] = [];
  welcomeScreenUserMedia = new UserMedia();
  profileUserMedia = new UserMedia();
  mediaLocations: MediaLocation[] = [];
  profilePhotomediaLocations: MediaLocation[] = [];
  buttonPressed = false;
  loading: any;
  errorMessage = '';
  video = faVideo;
  facamera = faCameraRetro;
  selectedMediaLocation: MediaLocation;
  selectedPhotoMediaLocation: MediaLocation;
  welcomeScreenVideoType = 101;
  profilePhotoType = 102;


  ngOnInit(): void {
    this.userMLO = JSON.parse(sessionStorage.getItem('userMLOForMedia'));
    this.quickQuoteService.getMediaLocationByFormatType('101').subscribe(res => {
      this.mediaLocations = res;
    })
    this.quickQuoteService.getMediaLocationByFormatType('102').subscribe(res => {
      this.profilePhotomediaLocations = res;
    })
    this.quickQuoteService.getUserMediaByUserId(this.userMLO.userId.toString()).subscribe(res =>
    {
      this.userMediaList = res;
      this.welcomeScreenUserMedia = this.userMediaList.filter(wel => wel.mediaType === this.welcomeScreenVideoType).pop();
      if(!this.welcomeScreenUserMedia){
        this.welcomeScreenUserMedia = new UserMedia();
      }
    })
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }

  saveUserMedia(form: NgForm) {
    this.buttonPressed = true;
    this.loading = true;
    this.selectedMediaLocation = this.mediaLocations.filter(m => m.mediaId === this.welcomeScreenUserMedia.mediaId).pop();
    this.welcomeScreenUserMedia.mediaURL = this.selectedMediaLocation.mediaURL;
    this.welcomeScreenUserMedia.mediaDescription = this.selectedMediaLocation.mediaDescription;
    this.welcomeScreenUserMedia.deleteFlag = false;
    this.welcomeScreenUserMedia.lastUpdatedAt = new Date();
    this.welcomeScreenUserMedia.userId = this.userMLO.userId;
    //making it null before save to avoid circular references
    this.userMLO.userMediaList = null;
    this.welcomeScreenUserMedia.userDTO = this.userMLO;
    this.welcomeScreenUserMedia.mediaType = this.welcomeScreenVideoType;
    this.quickQuoteService.saveUserMedia(this.welcomeScreenUserMedia).subscribe(
      res => {
        this.welcomeScreenUserMedia = res;
        this.loading = false;
        this.errorMessage = '';

      },
      error => {
        this.loading = false;
        this.errorMessage = error;
      }
    )
    this.saveProfileUserMedia();
  }

  saveProfileUserMedia() {
    this.buttonPressed = true;
    this.loading = true;
    this.selectedMediaLocation = this.mediaLocations.filter(m => m.mediaId === this.profileUserMedia.mediaId).pop();
    this.profileUserMedia.mediaURL = this.selectedMediaLocation.mediaURL;
    this.profileUserMedia.mediaDescription = this.selectedMediaLocation.mediaDescription;
    this.profileUserMedia.deleteFlag = false;
    this.profileUserMedia.lastUpdatedAt = new Date();
    this.profileUserMedia.userId = this.userMLO.userId;
    //making it null before save to avoid circular references
    this.userMLO.userMediaList = null;
    this.profileUserMedia.userDTO = this.userMLO;
    this.profileUserMedia.mediaType = this.profilePhotoType;
    this.quickQuoteService.saveUserMedia(this.profileUserMedia).subscribe(
      res => {
        this.profileUserMedia = res;
        this.loading = false;
        this.errorMessage = '';

      },
      error => {
        this.loading = false;
        this.errorMessage = error;
      }
    )
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
}
