import {Directive, effect, HostBinding} from '@angular/core';
import {Field} from '@angular/forms/signals';

@Directive({
  selector: '[field]'
})
export class StyledField<T> extends Field<T>{

  @HostBinding("class.ng-valid")
  ngValid = true;
  @HostBinding("class.ng-invalid")
  ngInvalid = ! this.ngValid;
  @HostBinding("class.ng-pristine")
  ngPristine = true;
  @HostBinding("class.ng-dirty")
  ngDirty = ! this.ngPristine;
  @HostBinding("class.ng-touched")
  ngTouched = false;
  @HostBinding("class.ng-untouched")
  ngUntouched = ! this.ngTouched;

  effect = effect(() => {
    this.ngValid = this.state().valid();
    this.ngInvalid = ! this.ngValid;
    this.ngDirty = this.state().dirty();
    this.ngPristine = ! this.ngDirty
    this.ngTouched = this.state().touched();
    this.ngUntouched = ! this.ngTouched;
  })
}
