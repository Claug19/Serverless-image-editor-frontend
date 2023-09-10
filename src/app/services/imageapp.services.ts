import { Injectable, Component } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs/operators"

import { ColorCodesTextResp, ColorCodesChartResp, RgbChannelsResp, RgbHistogramResp } from './interfaces/color.interfaces';
import { ConvertTypeResp } from './interfaces/convert.interfaces';
import { FlipResp, RotateResp } from './interfaces/edit.interfaces';
import { AddImageResp } from './interfaces/manage.interfaces';
import { ResizeImageResp } from './interfaces/size.interfaces';


@Injectable()
export class ImageAppService{
    private image_name: string ="-";

    private apiUrl: string= "127.0.0.1:8003";
    // private apiUrl: string= "https://qu48i6qbjb.execute-api.us-east-1.amazonaws.com/Prod";

    private jsonBodyHeaders = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json');

    constructor(private _http:HttpClient){
    }

    // getters / setters
    setImageName(givenImageUrl: string){
        this.image_name = givenImageUrl;
    }

    getImageName(){
        console.log("Image URL: ", this.image_name);
        return this.image_name;
    }

    // color requests
    colorCodesTextRequest(occurrence_value: number){
        console.log('POST: color codes text');

        const colorCodesUrl = this.apiUrl + "/color-codes-text"
        const colorCodesBody = {
            'images_paths' : [this.image_name],
            'occurrence_threshold' : occurrence_value
        };

        return this._http.post<ColorCodesTextResp>(colorCodesUrl, colorCodesBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    colorCodesChartRequest(occurrence_value: number){
        console.log('POST: color codes chart');

        const colorChartsUrl = this.apiUrl + "/color-codes-chart"
        const colorCodesBody = {
            'images_paths' : [this.image_name],
            'occurrence_threshold' : occurrence_value
        };

        return this._http.post<ColorCodesChartResp>(colorChartsUrl, colorCodesBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    rgbChannelsRequest(occurrence_value: number){
        console.log('POST: rgb channels');

        const rgbChannelsUrl = this.apiUrl + "/rgb-channels"
        const rgbChannelsBody = {
            'images_paths' : [this.image_name],
            'occurrence_threshold' : occurrence_value
        };

        return this._http.post<RgbChannelsResp>(rgbChannelsUrl, rgbChannelsBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    rgbHistogramRequest(occurrence_value: number){
        console.log('POST: rgb histogram');

        const rgbHistogramUrl = this.apiUrl + "/rgb-histogram"
        const rgbHistogramBody = {
            'images_paths' : [this.image_name],
            'occurrence_threshold' : occurrence_value
        };

        return this._http.post<RgbHistogramResp>(rgbHistogramUrl, rgbHistogramBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    // convert requests
    convertTypeRequest(new_format: string){
        console.log('PATCH: convert type');

        const convertTypeUrl = this.apiUrl + "/convert-type"
        const convertTypeBody = {
            'images_paths' : [this.image_name],
            'format' : new_format
        };

        return this._http.patch<ConvertTypeResp>(convertTypeUrl, convertTypeBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    // edit requests
    flipHorizontalRequest(){
        console.log('PATCH: flip horizontal');

        const flipHorizontalUrl = this.apiUrl + "/flip-horizontal"
        const flipHorizontalBody = {
            'images_paths' : [this.image_name]
        };

        return this._http.patch<FlipResp>(flipHorizontalUrl, flipHorizontalBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    flipVerticalRequest(){
        console.log('PATCH: flip vertical');

        const flipVerticalUrl = this.apiUrl + "/flip-vertical"
        const flipVerticalBody = {
            'images_paths' : [this.image_name]
        };

        return this._http.patch<FlipResp>(flipVerticalUrl, flipVerticalBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    rotateClockwiseRequest(){
        console.log('PATCH: rotate clockwise');

        const rotateClockwiseUrl = this.apiUrl + "/rotate-clockwise"
        const rotateClockwiseBody = {
            'images_paths' : [this.image_name]
        };

        return this._http.patch<RotateResp>(rotateClockwiseUrl, rotateClockwiseBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    rotateCounterClockwiseRequest(){
        console.log('PATCH: rotate counter clockwise');

        const rotateCounterClockwiseUrl = this.apiUrl + "/rotate-cclockwise"
        const rotateCounterClockwiseBody = {
            'images_paths' : [this.image_name]
        };

        return this._http.patch<RotateResp>(rotateCounterClockwiseUrl, rotateCounterClockwiseBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    rotate180Request(){
        console.log('PATCH: rotate 180 degrees');

        const rotate180Url = this.apiUrl + "/rotate-180"
        const rotate180Body = {
            'images_paths' : [this.image_name]
        };

        return this._http.patch<RotateResp>(rotate180Url, rotate180Body, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }

    // manage image requests

    // size requests
    resizeRequest(height: number, width: number){
        console.log('PATCH: resize image');

        const resizeImageUrl = this.apiUrl + "/resize-image"
        const resizeImageBody = {
            'image_path' : [this.image_name],
            'new_height' : height,
            'new_width' : width
        };

        return this._http.patch<ResizeImageResp>(resizeImageUrl, resizeImageBody, { headers: this.jsonBodyHeaders })
            .pipe(map(res => JSON.stringify(res)));
    }
}
