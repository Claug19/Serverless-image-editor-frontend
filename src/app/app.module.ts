import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { routing } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadImageComponent } from './components/load_image_tab/loadImage.component';
import { ColorComponent } from './components/color_tab/color.component';
import { ConvertComponent } from './components/convert_tab/convert.component';
import { EditComponent } from './components/edit_tab/edit.component';
import { SizeComponent } from './components/size_tab/size.component';
import { AboutComponent } from './components/about_tab/about.component';

import { ImageAppService } from './services/imageapp.services';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoadImageComponent,
    ColorComponent,
    ConvertComponent,
    EditComponent,
    SizeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot(),
    FormsModule,
    routing
  ],
  providers: [ ImageAppService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
