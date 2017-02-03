import { Injectable } from "@angular/core";
import { Place } from "../models/place.model";
import { Location } from "../models/location.model";

@Injectable()
export class PlacesService {
	private places: Place[] = [];

	addPlace(title: string, description: string, location: Location, imageUrl: string) {
		const newPlace = new Place(title, description, location, imageUrl);
		console.log(newPlace);
		this.places.push(newPlace);
	}

	getPlaces(): Place[] {
		return this.places.slice();
	}
}