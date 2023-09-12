import { Injectable, Component } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs/operators"


import { FlipResp, RotateResp } from './interfaces/edit.interfaces';
import { ResizeImageResp } from './interfaces/size.interfaces';


@Injectable()
export class ImageAppService{
  private image_name: string = "-";
  private image_url: string = "-";

  private colorTextUrl = "";
  private colorCodesUrl = "";
  private redChannelUrl = "";
  private greenChannelUrl = "";
  private blueChannelUrl = "";
  private redHUrl = "";
  private greenHUrl = "";
  private blueHUrl = "";
  private rgbHUrl = "";

  private convertUrl = "";

  private resizeUrl = "";

  private jsonBodyHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json');

  constructor(private _http:HttpClient){
  }

    // getters / setters
    setImageName(givenImageName: string){
        this.image_name = givenImageName;
    }

    getImageName(){
        return this.image_name;
    }

    setImageUrl(givenImageName: string){
      this.image_url = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/images/" + givenImageName + "?t=" + new Date().getTime();
      this.colorTextUrl = "";
      this.colorCodesUrl = "";
      this.redChannelUrl = "";
      this.greenChannelUrl = "";
      this.blueChannelUrl = "";
      this.redHUrl = "";
      this.greenHUrl = "";
      this.blueHUrl = "";
      this.rgbHUrl = "";
      this.convertUrl = "";
      this.resizeUrl = "";
    }

    resetImageUrl() {
      console.log("reset");
      let temp_image = this.image_url;
      this.image_url = "-";
      this.image_url = temp_image;
    }

    getImageUrl(){
      return this.image_url;
    }

    setCodesTextUrl(){
      let image_no_ext = this.image_name.split(".", 1)[0];
      this.colorTextUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_colorcodes.txt" + "?t=" + new Date().getTime();
    }

    setCodesChartUrl(){
      let image_no_ext = this.image_name.split(".", 1)[0];
      this.colorCodesUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_colorchart.png" + "?t=" + new Date().getTime();
    }

    setRgbChannelsUrl(){
      let image_no_ext = this.image_name.split(".", 1)[0];
      let image_ext = this.image_name.split(".", 2)[1];
      this.redChannelUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Rchannel." + image_ext + "?t=" + new Date().getTime();
      this.greenChannelUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Gchannel." + image_ext + "?t=" + new Date().getTime();
      this.blueChannelUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Bchannel." + image_ext + "?t=" + new Date().getTime();
    }

    setRgbCHistogramsUrl(){
      let image_no_ext = this.image_name.split(".", 1)[0];
      let image_ext = this.image_name.split(".", 2)[1];
      this.redHUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Rplot.png" + "?t=" + new Date().getTime();
      this.greenHUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Gplot.png" + "?t=" + new Date().getTime();
      this.blueHUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_Bplot.png" + "?t=" + new Date().getTime();
      this.rgbHUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_RGBplot.png" + "?t=" + new Date().getTime();
    }

    getColorTextUrl(){
        return this.colorTextUrl;
    }

    getColorCodesUrl(){
        return this.colorCodesUrl;
    }

    getRedChannelUrl(){
        return this.redChannelUrl;
    }

    getGreenChannelUrl(){
        return this.greenChannelUrl;
    }

    getBlueChannelUrl(){
        return this.blueChannelUrl;
    }

    getRedHUrl(){
        return this.redHUrl;
    }

    getGreenHUrl(){
        return this.greenHUrl;
    }

    getBlueHUrl(){
        return this.blueHUrl;
    }

    getRgbHUrl(){
        return this.rgbHUrl;
    }
    setConvertUrl(format : string){
      let image_no_ext = this.image_name.split(".", 1)[0];
      return this.convertUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + format + "?t=" + new Date().getTime();
    }

    getConvertUrl(){
      return this.convertUrl;
    }

    setResizeUrl(){
      let image_no_ext = this.image_name.split(".", 1)[0];
      let image_ext = this.image_name.split(".", 2)[1];
      return this.resizeUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/output/" + image_no_ext + "_resized." + image_ext + "?t=" + new Date().getTime();
    }

    getResizeUrl(){
        return this.resizeUrl;
    }
}
