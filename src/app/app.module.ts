import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { AddPlacePage } from "../pages/add-place/add-place";
import { AgmCoreModule } from "angular2-google-maps/core";
import { Storage } from "@ionic/storage";

import apiKeys from '../api.keys.json';
import { PlacesService } from "../services/places.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
	  PlacePage,
	  SetLocationPage,
	  AddPlacePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
	  AgmCoreModule.forRoot({
	  	apiKey: apiKeys['googleMapApiKey']
	  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
	  PlacePage,
	  SetLocationPage,
	  AddPlacePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, PlacesService, Storage]
})
export class AppModule {}
