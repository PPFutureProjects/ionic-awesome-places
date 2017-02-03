import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlacePage } from "../pages/place/place";
import { SetLocationPage } from "../pages/set-location/set-location";
import { AddPlacePage } from "../pages/add-place/add-place";
import { AgmCoreModule } from "angular2-google-maps/core";

import apiKeys from '../api.keys.json';

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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
