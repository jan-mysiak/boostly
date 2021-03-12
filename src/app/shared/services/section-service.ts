import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  _step = new BehaviorSubject(0);
  stepCount = 0;

  get currentStep() {
    return this._step.value;
  }
  set currentStep(step: number) {
    if (this.stepCount < 1) {
      throw new Error("Step count invalid");
    }

    const validStep = (this.stepCount - step) >= 0 && step >= 0;

    if (validStep) {
      this._step.next(step);
    }
  }

  subscribe(onSuccess: (step: number) => void, onError?: () => void) {
    return this._step.subscribe(onSuccess, onError);
  }
}
