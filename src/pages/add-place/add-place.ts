import { Component } from '@angular/core';

import { Geolocation } from "ionic-native";
import { ModalController, Loading, LoadingController, AlertController } from "ionic-angular";

import { SetLocationPage } from "../set-location/set-location";

import { Location } from "../../models/location.model";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

	location: Location = new Location(40.7624234, -73.9759827);
	locationIsSet: boolean = false;
	loading: Loading;

	constructor(
		private modalCtrl: ModalController,
	  private loadingCtrl: LoadingController,
	  private alertCtrl: AlertController
	) {}

	onOpenMap() {
		const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, displayMarker: this.locationIsSet });

		modal.onDidDismiss(data => {
			if (data != null && data.hasOwnProperty('location')) {
				this.location = data['location'];
				this.locationIsSet = true;
			}
		});

		modal.present();
	}

	onLocate() {
		this.displayLoading();
		Geolocation.getCurrentPosition()
			.then(location => {
				this.loading.dismiss();
				this.location = new Location(location.coords.latitude, location.coords.longitude);
				this.locationIsSet = true;
			})
			.catch(error => {
				this.loading.dismiss();
				this.displayError(error.message || 'Cannot get your location!');
			});
	}

	private displayError(message: string) {
		const alert = this.alertCtrl.create({
			title: 'Location Error',
			message: message,
			buttons: ['OK']
		});

		alert.present();
	}

	private displayLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Getting your current location...'
		});

		this.loading.present();
	}
}
