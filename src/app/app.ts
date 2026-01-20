import {Component, signal} from '@angular/core';
import {form, FormField, maxLength, minLength, pattern, required} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe,
    FormField
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  userInfo = signal({
    firstName: "",
    lastName: "",
    street: "",
    zip: "",
    city: "",
    cc: ""
  });

  userForm = form(this.userInfo, (path) => {
    required(path.firstName);
    required(path.zip);
    pattern(path.zip, new RegExp("[0-9]{5}"));
    required(path.cc);
    minLength(path.cc, 16);
    maxLength(path.cc, 16);
  });

  logForm(event: Event) {
    event.preventDefault();
    console.log(this.userForm().value());
  }

}
