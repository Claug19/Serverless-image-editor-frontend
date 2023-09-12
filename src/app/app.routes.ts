import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders }  from '@angular/core';

import { LoadImageComponent } from "./components/load_image_tab/loadImage.component";
import { ColorComponent } from "./components/color_tab/color.component";
import { ConvertComponent } from "./components/convert_tab/convert.component";
import { EditComponent } from "./components/edit_tab/edit.component";
import { SizeComponent } from "./components/size_tab/size.component";
import { AboutComponent } from "./components/about_tab/about.component";

const appRoutes: Routes = [
    {
        path:'',
        component: LoadImageComponent
    },
    {
        path:'loadImage',
        component: LoadImageComponent
    },
    {
        path: 'color',
        component: ColorComponent
    },
    {
        path: 'convert',
        component: ConvertComponent
    },
    {
        path: 'edit',
        component: EditComponent
    },
    {
        path: 'size',
        component: SizeComponent
    },
    {
        path:'about',
        component: AboutComponent
    }
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
