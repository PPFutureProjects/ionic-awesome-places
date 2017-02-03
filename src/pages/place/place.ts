import { Component, OnInit } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { Place } from "../../models/place.model";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage implements OnInit {

	place: Place;
	placeIndex: number;

  constructor(
  	private navParams: NavParams,
	  private navCtrl: NavController,
    private placesService: PlacesService) {}

  ngOnInit() {
  	this.place = this.navParams.get('place');
  	this.placeIndex = this.navParams.get('index');
  }

  onDelete() {
  	this.placesService.removePlace(this.placeIndex);
  	this.navCtrl.pop();
  }
}
