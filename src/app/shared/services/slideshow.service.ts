import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {
  _step = new BehaviorSubject(0);
  stepLength = 0;

  get step() {
    return this._step.value;
  }
  set step(val: number) {
    if (!this.stepLength) {
      throw new Error("Step length not set");
    }

    // Within bounds & larger than zero
    const isValid = (this.stepLength - val) >= 0 && val >= 0;

    if (isValid) {
      this._step.next(val);
    }
  }

  subscribe(onSuccess: (step: number) => void, onError?: () => void) {
    return this._step.subscribe(onSuccess, onError);
  }
}
