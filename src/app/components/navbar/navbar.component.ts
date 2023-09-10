import { Component } from '@angular/core';
import { ImageAppService } from 'src/app/services/imageapp.services'

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {
  title = 'image-editor';
  url = '';

  constructor(private _ImageAppService: ImageAppService)
  {

  }

  getImageUrl()
  {
    return this._ImageAppService.getImageName();
  }
}
