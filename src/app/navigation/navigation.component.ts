import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SlideshowService } from '../shared/services/slideshow.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  slideshowSubscription = Subscription.EMPTY;
  progress = 0;
  menuOpen = false;
  currentSlide = 0;

  constructor(private slideshowService: SlideshowService) {
    this.slideshowSubscription = slideshowService.subscribe(this.onSlideChange.bind(this));
  }

  ngOnDestroy(): void {
    this.slideshowSubscription.unsubscribe();
  }

  onSlideChange(step: number) {
    if (this.slideshowService.stepLength) {
      this.progress = (step / this.slideshowService.stepLength) * 100;
      this.currentSlide = step;

    }
  }

  setStep(step: number) {
    this.menuOpen = false;
    setTimeout(() => {
      this.slideshowService.step = step;
    }, 300)
  }

  toggleMenu = () => this.menuOpen = !this.menuOpen;
}
