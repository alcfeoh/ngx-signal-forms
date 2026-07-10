import {Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import {
  FieldState,
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  pattern,
  required,
  submit
} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';
import {UserService} from './user';
import {registerZipValidation} from './zip.validator';
import {StarRatingComponent} from './star-rating/star-rating';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe,
    FormField,
    FormRoot,
    StarRatingComponent
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
      country: "",
    },
    cc: "",
    rating: 0
  });

  userForm = form(this.userInfo, (path) => {
    required(path.firstName, {message: 'First name is required'});
    registerZipValidation(path.address.zip, path.address.country);
    required(path.cc, {message: 'Credit card number is required'});
    minLength(path.cc, 16, {message: 'Credit card number must have 16 digits'});
    maxLength(path.cc, 16, {message: 'Credit card number must be less than 17 digits'});
  });

  async onSave() {
    // When calling submit() directly, the action is passed as the second argument
    // instead of being configured in the form options.
    const success = await submit(this.userForm, async (field) => {
      try {
        await this.userService.saveUserInfo(field().value());
        return undefined;
      } catch {
        return { kind: 'serverError', message: 'Could not save your information.' };
      }
    });

    if (success) {
      alert("Form saved successfully");
    }
  }
}
