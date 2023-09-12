import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {ImageAppService} from "src/app/services/imageapp.services";
import {ResizeImageResp} from "../../services/interfaces/size.interfaces";

@Component({
  selector: 'app-size',
  templateUrl: 'size.component.html',
  styles:[
  ]
})
export class SizeComponent {
  title = 'image-editor';

  private jsonBodyHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  private response ="";
  private apiUrl= 'http://127.0.0.1:8080';
  private resizedUrl = "-";

  private height = 500;
  private width = 500;

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient){
  }

  getResponse()
  {
    return this.response;
  }

  getImageName(){
    return this._ImageAppService.getImageName();
  }

  getResizeUrl(){
    return this.resizedUrl;
  }

  onHeightChange(value : any)
  {
    this.height = +value.target.value;
    console.log(this.height);
    return this.height;
  }

  onWidthChange(value : any)
  {
    this.width = +value.target.value;
    console.log(this.width);
    return this.width;
  }

  // size requests
  resizeRequest(){
    console.log('PATCH: resize image');
    this.response = "Loading ..."

    const resizeImageUrl = this.apiUrl + "/resize-image"
    const resizeImageBody = {
      'image_path' : this._ImageAppService.getImageName(),
      'new_height' : this.height,
      'new_width' : this.width
    };

    let result = this._http.patch<ResizeImageResp>(resizeImageUrl, resizeImageBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setResizeUrl();
      this.resizedUrl = this._ImageAppService.getResizeUrl() + "?t=" + new Date().getTime();
      this.response=res['message'];
    });
  }
}
