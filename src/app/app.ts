import {Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import {form, FormField, FormRoot, maxLength, minLength, pattern, required, submit} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';
import {UserService} from './user';

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

  private userService = inject(UserService);

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
    submit(this.userForm,
      {
        action: async (field) => {
          const result = await this.userService.saveUserInfo(field().value());
          return;
        }}
    ).then(() => alert("Form submitted successfully"));
  }

}
