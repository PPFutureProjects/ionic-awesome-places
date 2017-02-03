import { Component } from '@angular/core';
import { SetLocationPage } from "../set-location/set-location";
import { ModalController } from "ionic-angular";
import { Location } from "../../models/location.model";

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {

	location: Location = new Location(40.7624234, -73.9759827);
	locationIsSet: boolean = false;

	constructor(private modalCtrl: ModalController) {}

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

}
