import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { ConvertTypeResp } from 'src/app/services/interfaces/convert.interfaces';
import { ImageAppService } from "src/app/services/imageapp.services";

@Component({
  selector: 'app-convert',
  templateUrl: 'convert.component.html',
  styles:[
  ]
})
export class ConvertComponent {
  title = 'image-editor';

  private jsonBodyHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  private response ="";
  private apiUrl= 'http://127.0.0.1:8080';

  private format = ".bmp";

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient){
  }

  getResponse()
  {
    return this.response;
  }

  getImageName(){
    return this._ImageAppService.getImageName();
  }

  setFormat(format: string){
    this.format = format;
    console.log(this.format);
  }

  getConvertUrl() {
    return this._ImageAppService.getConvertUrl();
  }

  convertRequest(){
    console.log('PATCH: convert image type');
    console.log(this.format);
    this.response="Loading ...";

    const conertTypeUrl = this.apiUrl + "/convert-type"
    const convertTypeBody = {
      'images_paths' : [this._ImageAppService.getImageName()],
      'format' : this.format
    };

    let result = this._http.patch<ConvertTypeResp>(conertTypeUrl, convertTypeBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setConvertUrl(this.format);
      this.response=res['message'];
    });
  }
}
