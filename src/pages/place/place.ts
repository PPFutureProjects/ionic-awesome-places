import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Place } from "../../models/place.model";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage implements OnInit {

	place: Place;

  constructor(public navParams: NavParams) {}

  ngOnInit() {
  	this.place = this.navParams.data;
  }
}
