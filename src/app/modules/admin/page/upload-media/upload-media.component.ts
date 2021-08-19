import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {QuickQuoteService} from '@data/service/quickquote.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {UserMedia} from '@data/schema/user/user-media';

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
  userMedia = new UserMedia();
  fileSelected = false;
  constructor(public quickQuoteService : QuickQuoteService, private _location: Location,
              private route : ActivatedRoute,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    formData.append('videoFile', this.uploadForm.get('media_file').value);
    this.quickQuoteService.uploadMedia(formData).subscribe(
      (res) => {
        this.userMedia = res;
        this.loading = false;
        this.fileSelected = false;
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
    }

  }
}
