import {Component, signal} from '@angular/core';
import {form, FormField, FormRoot} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    FormRoot, FormField, JsonPipe
  ]
})
export class LoginComponent {
  model = signal({ email: '', password: '' });
  loginForm = form(this.model);
}
