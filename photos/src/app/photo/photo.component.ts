import { Component, OnInit } from '@angular/core';
import { FetchPhotoService } from '../fetch-photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  DEFAULT_PHOTO_URL = '../../assets/default_photo.png';
  photoURL = '';
  constructor(private remotePhoto: FetchPhotoService) {}

  ngOnInit() {}

  fetchPhoto() {
    const fetchedURL = this.remotePhoto.fetch();

    if (!fetchedURL){
      // this.photoURL = this.DEFAULT_PHOTO_URL;
    }
  }
}
