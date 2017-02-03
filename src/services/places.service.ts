import { Injectable } from "@angular/core";
import { Place } from "../models/place.model";
import { Location } from "../models/location.model";

import { File, FileError } from 'ionic-native';
import { Storage } from '@ionic/storage';

declare var cordova: any;

@Injectable()
export class PlacesService {

	private places: Place[] = [];

	constructor(private storage: Storage) {}

	addPlace(title: string, description: string, location: Location, imageUrl: string) {
		const newPlace = new Place(title, description, location, imageUrl);
		this.places.push(newPlace);

		this.storage.set('places', this.places)
			.then()
			.catch(error => {
				this.places.splice(this.places.indexOf(newPlace), 1);
			});
	}

	getPlaces(): Place[] {
		return this.places.slice();
	}

	fetchPlaces() {
		this.storage.get('places')
			.then((places: Place[]) => {
				this.places = places != null ? places : [];
			})
			.catch(error => {
				console.log(error);
			})
	}

	removePlace(index: number) {
		const place = this.places[index];
		this.places.splice(index, 1);
		this.storage.set('places', this.places)
			.then(() => {
				this.removeFile(place);
			})
			.catch(error => console.log(error));
	}

	private removeFile(place: Place) {
		const fileName = place.imagePath.replace(/^.*[\\\/]]/, '');

		File.removeFile(cordova.file.dataDirectory, fileName)
			.then()
			.catch((error: FileError) => {
				console.log(error.message);
				this.addPlace(place.title, place.description, place.location, place.imagePath);
			});
	}
}