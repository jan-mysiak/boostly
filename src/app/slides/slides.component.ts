import { fillerText } from './../shared/fillerText';
import { SlideshowService } from './../shared/services/slideshow.service';
import { AfterContentInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

const ACCEPT_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

@Component({
  selector: 'app-slides',
  styleUrls: ["./slides.component.scss"],
  templateUrl: "./slides.component.html"
})
export class SlidesComponent implements AfterContentInit, OnDestroy {
  scrollTimer: number | undefined = undefined;
  slideshowSubscription = Subscription.EMPTY;
  slides: Element[] = [];
  currentSlide = 0;
  startTouch = 0;
  // *** temp
  filler = fillerText;
  sent = false;

  send() {
    setTimeout(() => {
      this.sent = true;
    }, 1000)
    setTimeout(() => {
      this.sent = false;
    }, 4000)
  }
  // ***

  constructor(private ref: ElementRef, private slideshowService: SlideshowService) { }

  ngAfterContentInit(): void {
    const slidesCollection = this.ref.nativeElement.children as Element[];

    for (const slide of slidesCollection) {
      this.slides.push(slide);
    }

    this.slideshowService.stepLength = this.slides.length - 1;
    this.slideshowSubscription = this.slideshowService.subscribe(this.onStepChange.bind(this));

    this.ref.nativeElement.classList.add("ready");
  }

  ngOnDestroy(): void {
    this.slideshowSubscription.unsubscribe();
  }

  // Keydown
  @HostListener("window:keydown", ["$event"]) onKeyDown(e: KeyboardEvent) {
    const pressedKey = e.key;

    if (ACCEPT_KEYS.includes(pressedKey) && !e.ctrlKey) {
      e.preventDefault();
      // Arrow Up
      if (pressedKey === ACCEPT_KEYS[0]) {
        this.setStep(this.slideshowService.stepLength);
      }
      // Arrow down
      else if (pressedKey === ACCEPT_KEYS[2]) {
        this.setStep(0);
      }
      // Right or left
      else {
        const next = this.nextStep(pressedKey === ACCEPT_KEYS[1]);
        this.setStep(next);
      }
    }
  }

  @HostListener("wheel", ["$event"]) onWheelScroll(e: WheelEvent) {
    // Scroll to next/prev if not already scrolling
    if (!this.scrollTimer && !e.ctrlKey) {
      e.preventDefault();
      const next = this.nextStep(e.deltaY > 0);
      this.setStep(next);
    }

    this.handleScrollEnd();
  }

  @HostListener("scroll") onScroll() {
    this.handleScrollEnd();
  }

  // Touch
  @HostListener("touchstart", ["$event"]) onTouchStart(e: TouchEvent) {
    if (!this.startTouch) {
      this.startTouch = e.touches[0].clientX;
    }
  }

  @HostListener("touchmove", ["$event"]) onTouchMove(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0].clientX;

    // Scroll to next/prev if not already scrolling
    if (this.startTouch && !this.scrollTimer) {
      const next = this.nextStep(this.startTouch > touch);
      this.setStep(next);

      this.startTouch = 0;
    }

    this.handleScrollEnd();
  }

  handleScrollEnd() {
    window.clearTimeout(this.scrollTimer);

    const temp = this.scrollTimer = window.setTimeout(() => {
      if (temp === this.scrollTimer) {
        this.setActive(this.slideshowService.step);
        this.scrollTimer = undefined;
      }
    }, 100)
  }

  onStepChange(step: number) {
    if (step !== this.currentSlide) {
      this.setInactive(this.currentSlide);
      this.currentSlide = step;

      this.slides[step]?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start"
      });
    }
  }

  setActive(index: number) {
    this.slides[index].classList.add("active");
  }

  setInactive(index: number) {
    this.slides[index]?.classList.remove("active");
  }

  nextStep(shouldIncrement: boolean) {
    return this.currentSlide + (shouldIncrement ? 1 : -1)
  }

  setStep(step: number) {
    this.slideshowService.step = step;
  }
}