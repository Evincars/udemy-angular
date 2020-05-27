import { Component, OnInit } from '@angular/core';
import { FetchPhotoService } from '../fetch-photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  DEFAULT_PHOTO_URL = '../../assets/default_photo.png';
  photoURL = this.DEFAULT_PHOTO_URL;
  constructor(private remotePhoto: FetchPhotoService) {}

  ngOnInit() {}

  fetchPhoto() {
    this.remotePhoto.fetch().subscribe((v) => (this.photoURL = v));
  }
}
