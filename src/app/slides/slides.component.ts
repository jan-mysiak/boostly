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

    // Populate slides
    for (const slide of slidesCollection) {
      this.slides.push(slide);
    }

    // Initialize service
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
    if (!e.ctrlKey) {
      e.preventDefault();
    }
    // Scroll to next/prev if not already scrolling
    if (!this.scrollTimer && !e.ctrlKey) {
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
    const elem = e.target as Element;
    const validTouch = !this.startTouch && !e.altKey && !e.ctrlKey && !elem.classList.contains("btn");

    if (validTouch) {
      e.preventDefault();
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

    // Mostly to handle smooth scroll which takes forever to stop firing
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

      // Temporary
      if (Math.abs(step - this.currentSlide) > 1) {
        this.toggleZoom();

        window.setTimeout(() => {
          this.currentSlide = step;
          this.goTo(step);
        }, 300);

        window.setTimeout(() => {
          this.toggleZoom();
        }, 900)

        return;
      }

      this.goTo(step);
      this.currentSlide = step;
    }
  }

  goTo(step: number) {
    this.slides[step]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "start"
    });
  }

  setActive(index: number) {
    this.slides[index]?.classList.add("active");
  }

  toggleZoom() {
    this.slides.forEach(s => {
      s.classList.toggle("zoom-out");
    })
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
