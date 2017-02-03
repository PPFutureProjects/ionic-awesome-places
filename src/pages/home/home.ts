import { Component, OnInit } from '@angular/core';

import { AddPlacePage } from "../add-place/add-place";
import { PlacesService } from "../../services/places.service";
import { Place } from "../../models/place.model";
import { NavController } from "ionic-angular";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	addPlacePage = AddPlacePage;
	places: Place[] = [];

	constructor(
		private placesService: PlacesService,
	  private navCtrl: NavController
	) {}

	ngOnInit() {
		this.placesService.fetchPlaces()
			.then((places: Place[]) => {
				this.places = places;
			});
	}

	ionViewWillEnter() {
		this.places = this.placesService.getPlaces();
	}

	onOpenPlace(place: Place, index: number) {
		this.navCtrl.push(PlacePage, {
			place: place,
			index: index
		});
	}
}
