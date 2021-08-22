import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {MediaLocation} from '@data/schema/user/media-location';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UploadMediaComponent implements OnInit {

  uploadForm: FormGroup;
  loading: any;
  uploadMessage: any;
  mediaDescription: any;
  mediaLocation = new MediaLocation();
  fileSelected = false;
  crudType : string;
  buttonDesc ="Upload Media";
  buttonPressed = false;
  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private formBuilder: FormBuilder, private route : ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.crudType = this.route.snapshot.paramMap.get('crudType');
    if(this.crudType === 'edit'){
      this.mediaLocation = JSON.parse(sessionStorage.getItem("mediaLocation"));
      this.mediaDescription = this.mediaLocation.mediaDescription;
       this.buttonDesc = "Change Media"
      this.fileSelected = false;
    }
    this.uploadForm = this.formBuilder.group({
      media_file: ['']
    });
  }

  backClicked($event: MouseEvent) {
    $event.preventDefault();
    this._location.back();
  }

  upload(form: NgForm) {
     //nothing
  }
  cancelUpload() {
    //nothing
  }
  onSubmit() {
    const formData = new FormData();
    this.loading = true;
    this.mediaLocation.deleteFlag = false;
    formData.append('videoFile', this.uploadForm.get('media_file').value);
    formData.append('mediaLocationDTO', JSON.stringify(this.mediaLocation));
    this.buttonPressed = true;
    this.quickQuoteService.uploadMedia(formData).subscribe(
      (res) => {
        this.mediaLocation = res;
        this.loading = false;
        this.fileSelected = false;
        setTimeout(() => {
          this._location.back();
        }, 2000);
      },
      (err) => {
        this.uploadMessage = 'Upload Failed';
        this.loading = false;
        this.fileSelected = false;
      }

    );

  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('media_file').setValue(file);
      this.fileSelected = true;
      this.buttonPressed = false;

    }

  }
}
