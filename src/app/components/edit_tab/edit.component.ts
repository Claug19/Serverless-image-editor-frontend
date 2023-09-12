import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ImageAppService} from "src/app/services/imageapp.services";
import {FlipResp, RotateResp} from "../../services/interfaces/edit.interfaces";
import {map} from "rxjs/operators";
import {ColorCodesTextResp} from "../../services/interfaces/color.interfaces";

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.component.html',
  styles:[
  ]
})
export class EditComponent {
  title = 'image-editor';

  private jsonBodyHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  private response ="";
  private apiUrl= 'http://127.0.0.1:8080';

  private flipValue = "horizontal";
  private rotateValue = "clockwise";
  private editedUrl = "-";

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient){
  }

  getResponse()
  {
    return this.response;
  }

  getImageName(){
    return this._ImageAppService.getImageName();
  }

  getImageUrl(){
    return this.editedUrl;
  }

  getEditUrl() {
    return this.editedUrl;
  }

  onFlipChange(value : string)
  {
    this.flipValue = value;
    console.log(this.flipValue);
    return this.flipValue;
  }

  onRotateChange(value : string)
  {
    this.rotateValue = value;
    console.log(this.rotateValue);
    return this.rotateValue;
  }

  // edit requests
  flipRequest(){
    console.log('PATCH: flip');
    this.response="Loading ...";
    // this.resetEditUrl();

    let flipUrl = "";
    if (this.flipValue=="horizontal")
    {
      flipUrl = this.apiUrl + "/flip-horizontal";
    }
    else
    {
      flipUrl = this.apiUrl + "/flip-vertical";
    }

    const flipBody = {
      'images_paths' : [this.getImageName()]
    };

    let result = this._http.patch<FlipResp>(flipUrl, flipBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this.editedUrl = this._ImageAppService.getImageUrl() + "?t=" + new Date().getTime();
      this.response=res['message'];
    });
  }
  rotateRequest(){
    console.log('PATCH: rotate');
    this.response = "Loading ...";
    // this.resetEditUrl();

    let rotateUrl = "";
    if (this.rotateValue=="clockwise")
    {
      rotateUrl = this.apiUrl + "/rotate-clockwise";
    }
    else if (this.rotateValue=="cclockwise")
    {
      rotateUrl = this.apiUrl + "/rotate-cclockwise";
    }
    else if (this.rotateValue=="180")
    {
      rotateUrl = this.apiUrl + "/rotate-180";
    }

    const rotateBody = {
      'images_paths' : [this.getImageName()]
    };

    let result = this._http.patch<RotateResp>(rotateUrl, rotateBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this.editedUrl = this._ImageAppService.getImageUrl() + "?t=" + new Date().getTime();
      this.response=res['message'];
    });
  }
}
