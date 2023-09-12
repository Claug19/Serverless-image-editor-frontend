import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"

import { ColorCodesTextResp, ColorCodesChartResp, RgbChannelsResp, RgbHistogramResp } from 'src/app/services/interfaces/color.interfaces';
import { ImageAppService } from "src/app/services/imageapp.services";


@Component({
  selector: 'app-color',
  templateUrl: 'color.component.html',
  styles:[
  ]
})
export class ColorComponent {
  title = 'image-editor';

  private jsonBodyHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  private response ="";
  private apiUrl= 'http://127.0.0.1:8080';

  private occurenceTreshold = 500;
  private grayscaleFlag = false;

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient){
  }

  // getters / setters
  onOccurenceThresholdChange(value : any)
  {
    this.occurenceTreshold = +value.target.value;
    console.log(this.occurenceTreshold);
    return this.occurenceTreshold;
  }
  onGrayscaleFlagChange()
  {
    if (this.grayscaleFlag == true) {
      this.grayscaleFlag = false;
    }
    else if (this.grayscaleFlag == false)
    {
      this.grayscaleFlag = true;
    }
    console.log(this.grayscaleFlag);
    return this.grayscaleFlag;
  }

  getResponse()
  {
    return this.response;
  }

  getImageName(){
    return this._ImageAppService.getImageName();
  }

  getColorTextUrl(){
    return this._ImageAppService.getColorTextUrl();
  }

  getColorCodesUrl(){
    return this._ImageAppService.getColorCodesUrl();
  }

  getRedChannelUrl(){
    return this._ImageAppService.getRedChannelUrl();
  }

  getGreenChannelUrl(){
    return this._ImageAppService.getGreenChannelUrl();
  }

  getBlueChannelUrl(){
    return this._ImageAppService.getBlueChannelUrl();
  }

  getRedHUrl(){
    return this._ImageAppService.getRedHUrl();
  }

  getGreenHUrl(){
    return this._ImageAppService.getGreenHUrl();
  }

  getBlueHUrl(){
    return this._ImageAppService.getBlueHUrl();
  }

  getRgbHUrl(){
    return this._ImageAppService.getRgbHUrl();
  }


  // color requests
  colorCodesTextRequest(){
    console.log('POST: color codes text');
    this.response = "Loading ...";

    const colorCodesUrl = this.apiUrl + "/color-codes-text"
    const colorCodesBody = {
      'images_paths' : [this._ImageAppService.getImageName()],
      'occurrence_threshold' : this.occurenceTreshold
    };

    let result = this._http.post<ColorCodesTextResp>(colorCodesUrl, colorCodesBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setCodesTextUrl();
      this.response=res['message'];
    });
  }

  colorCodesChartRequest(){
    console.log('POST: color codes chart');
    this.response = "Loading ...";

    const colorChartsUrl = this.apiUrl + "/color-codes-chart"
    const colorCodesBody = {
      'images_paths' : [this._ImageAppService.getImageName()],
      'occurrence_threshold' : this.occurenceTreshold
    };

    let result = this._http.post<ColorCodesChartResp>(colorChartsUrl, colorCodesBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setCodesChartUrl();
      this.response=res['message'];
    });
  }

  rgbChannelsRequest(){
    console.log('POST: rgb channels');
    this.response = "Loading ...";

    const rgbChannelsUrl = this.apiUrl + "/rgb-channels"
    const rgbChannelsBody = {
      'images_paths' : [this._ImageAppService.getImageName()],
      'greyscale_flag' : this.grayscaleFlag
    };

    let result = this._http.post<RgbChannelsResp>(rgbChannelsUrl, rgbChannelsBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setRgbChannelsUrl();
      this.response=res['message'];
    });
  }

  rgbHistogramRequest(){
    console.log('POST: rgb histogram');
    this.response = "Loading ...";

    const rgbHistogramUrl = this.apiUrl + "/rgb-histogram"
    const rgbHistogramBody = {
      'images_paths' : [this._ImageAppService.getImageName()],
      'greyscale_flag' : this.grayscaleFlag
    };

    let result = this._http.post<RgbHistogramResp>(rgbHistogramUrl, rgbHistogramBody, { headers: this.jsonBodyHeaders })
    result.subscribe((res) =>
    {
      this._ImageAppService.setRgbCHistogramsUrl();
      this.response=res['message'];
    });
  }
}
