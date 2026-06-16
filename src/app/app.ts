import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {form, FormField, FormRoot, maxLength, minLength, pattern, required, submit} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe,
    FormField,
    FormRoot
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {

  userInfo = signal({
    firstName: "",
    lastName: "",
    address: {
      street: "",
      zip: "",
      city: "",
    },
    cc: ""
  });

  userForm = form(this.userInfo, (path) => {
    required(path.firstName);
    required(path.address.zip);
    pattern(path.address.zip, new RegExp("[0-9]{5}"));
    required(path.cc);
    minLength(path.cc, 16);
    maxLength(path.cc, 16);
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log("HERE");
    submit(this.userForm, async () => {
      // TODO Use service here, make a fake HTTPClient request
      // firstValueFrom()
      // https://angular.dev/guide/forms/signals/form-submission#setting-up-form-submission-with-formroot
    }).then(() => alert("Form submitted successfully"));
  }

}
