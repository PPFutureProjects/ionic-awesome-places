import { Component } from '@angular/core';

import { AddPlacePage } from "../add-place/add-place";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	addPlacePage = AddPlacePage;

  onFormSubmit(form: NgForm) {
  	console.log(form.value);
  }
}
