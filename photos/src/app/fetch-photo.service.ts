import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchPhotoService {

  constructor() { }

  fetch() {
    return '../../assets/default_photo.png';
  }
}
