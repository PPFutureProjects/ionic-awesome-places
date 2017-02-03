import { Component } from '@angular/core';

import { Geolocation, Camera } from "ionic-native";
import {
	ModalController, Loading, LoadingController, AlertController, ActionSheetController,
	NavController
} from "ionic-angular";

import { SetLocationPage } from "../set-location/set-location";

import { Location } from "../../models/location.model";
import { NgForm } from "@angular/forms";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

	location: Location = new Location(40.7624234, -73.9759827);
	locationIsSet: boolean = false;
	loading: Loading;
	pictureUrl: string;

	constructor(
		private modalCtrl: ModalController,
	  private loadingCtrl: LoadingController,
	  private alertCtrl: AlertController,
	  private actionSheetCtrl: ActionSheetController,
	  private placesService: PlacesService,
	  private navCtrl: NavController
	) {}

	onFormSubmit(form: NgForm) {
		this.placesService.addPlace(form.value.title, form.value.description, this.location, this.pictureUrl);
		form.reset();
		this.navCtrl.pop();
	}

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

	onTakePicture() {
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Take Picture',
			buttons: [
				{
					text: 'Camera',
					handler: () => {
						this.takePicture(Camera.PictureSourceType.CAMERA);
					}
				},
				{
					text: 'Library',
					handler: () => {
						this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						console.log('Cancelled!');
					}
				}
			]
		});

		actionSheet.present();
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

	private takePicture(type: any) {
		Camera.getPicture({
			encodingType: Camera.EncodingType.JPEG,
			sourceType: type,
			correctOrientation: true
		})
			.then(pictureData => {
				this.pictureUrl = pictureData;
			})
			.catch(error => {
				console.log(error);
			});
	}
}
