import { Component } from '@angular/core';
import { ImageAppService } from 'src/app/services/imageapp.services'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators"
import {Observable} from "rxjs";

@Component({
  selector: 'app-loadImage',
  templateUrl: 'loadImage.component.html',
  styles: [
  ]
})
export class LoadImageComponent {

  private jsonBodyHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  title = 'image-editor';
  private image_name = "";
  private image_content = "";
  private response;
  private apiUrl= 'http://127.0.0.1:8080';

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient)
  {
  }

  // getters/setters
  getImageName()
  {
    return this._ImageAppService.getImageName();
  }

  getCurrentImageUrl()
  {
    return this._ImageAppService.getImageUrl();
  }

  getResponse()
  {
    return this.response;
  }

  onFileSelected(event:any)
  {
    if(event.target.files.length > 0)
    {
      // console.log(event.target.files[0].name);
      let files = event.target.files;
      let file = files[0];

      if (files && file) {
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }
      this.image_name = file.name
    }
    return this.image_name;
  }
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.image_content = btoa(binaryString);
    // console.log(btoa(binaryString));
  }

  uploadFile(){
    console.log("upload file");
    if ( this.image_name && this.image_content)
    {
      this.addImageRequest(this.image_name, this.image_content);
    }
  }

  addImageRequest(image_name: string, image_content: string){
        console.log('POST: add image');
        this.response = "Loading ..."

        const addImageUrl = this.apiUrl + "/add-new-image"
        const addImageBody =
        {
          "name" : image_name,
          "content" : image_content
        };
        // console.log("STRING", imageBodySting);
        // console.log(addImageUrl);
        // console.log(addImageBody);
        // console.log(this.jsonBodyHeaders);

        let result = this._http.post<any>(addImageUrl, addImageBody, { headers: this.jsonBodyHeaders });
        result.subscribe((res) =>
        {
          this.response=res['message'];
          this._ImageAppService.setImageName(image_name);
          this._ImageAppService.setImageUrl(image_name);
        });


        return result;
  }
}
