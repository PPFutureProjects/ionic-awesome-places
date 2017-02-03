import { Component, OnInit } from '@angular/core';
import { Location } from "../../models/location.model";
import { NavParams } from "ionic-angular";

@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html'
})
export class SetLocationPage implements OnInit {

	location: Location;

	constructor(private navParams: NavParams) {}

	ngOnInit() {
		this.location = this.navParams.get('location');
	}
}
