import { Component, OnInit } from '@angular/core';
import { Location } from "../../models/location.model";
import { NavParams, ViewController } from "ionic-angular";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage implements OnInit {

	location: Location;
	marker: Location;

	constructor(
		private navParams: NavParams,
	  private viewCtrl: ViewController
	) {}

	ngOnInit() {
		this.location = this.navParams.get('location');
		this.marker = this.navParams.get('displayMarker') ? this.location : null;
	}

	onSetMarker(event: any) {
		this.marker = new Location(event.coords.lat, event.coords.lng);
	}

	onConfirm() {
		this.viewCtrl.dismiss({
			location: this.marker
		});
	}

	onAbort() {
		this.viewCtrl.dismiss();
	}
}
