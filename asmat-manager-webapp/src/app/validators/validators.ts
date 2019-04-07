import {ValidatorFn, Validators} from '@angular/forms';

export class CustomValidators {

  static get phone(): ValidatorFn {
    return Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
  }

}
