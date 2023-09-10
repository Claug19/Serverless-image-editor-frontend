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

  private jsonBodyHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  });

  title = 'image-editor';
  private image_name = "";
  private image_url = "";
  private image_content = "";
  private response = {};
  private apiUrl: string= "https://qu48i6qbjb.execute-api.us-east-1.amazonaws.com/Prod";
  private bucketImagesUrl = "https://images-editor-app-bucket.s3.us-east-2.amazonaws.com/images/";

  constructor(private _ImageAppService: ImageAppService, private _http:HttpClient)
  {
  }

  onFileSelected(event:any)
  {
    if(event.target.files.length > 0)
    {
      console.log(event.target.files[0].name);

      let files = event.target.files;
      let file = files[0];

      if (files && file) {
        let reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
      }

      this._ImageAppService.setImageName(file.name)
      this.image_name = this.getImageName();
      this.image_url = this.bucketImagesUrl + this.getImageName();
    }
    return this.image_name;
  }
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.image_content = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  uploadFile(){
    console.log("upload file");
    if ( this.image_name && this.image_content)
    {
      this.response = this.addImageRequest(this.image_name, this.image_content);
      console.log(this.response);
    }
  }

  addImageRequest(image_name: string, image_content: string){
        console.log('POST: add image');

        const addImageUrl = this.apiUrl + "/add-image"
        console.log(addImageUrl)
        const addImageBody = {
          'name' : image_name,
          'content' : image_content
        };

        let preflight = this._http.options<any>(addImageUrl);

        preflight.subscribe();

        let result= this._http.post<any>(addImageUrl, JSON.stringify(addImageBody), { headers: this.jsonBodyHeaders })
          .pipe(map(res => res.json()));

        return result.subscribe();
    }

  getImageName()
  {
    return this._ImageAppService.getImageName();
  }

  getResponse()
  {
    return this.response;
  }
}
