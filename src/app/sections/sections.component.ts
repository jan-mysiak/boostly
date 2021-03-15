import { SectionService } from './../shared/services/section-service';
import { fillerText } from './../shared/fillerText';
import { AfterContentInit, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

const ACCEPT_KEYS = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

@Component({
  selector: 'app-sections',
  styleUrls: ['./sections.component.css'],
  template: `
  <app-home 
    id="home"
    [filler]="filler.slice(0,150)" 
    (registerClick)="setSectionStep(sections.length - 1)" 
    class="active"
  ></app-home>
  <app-wellness id="wellness" [filler]="filler.slice(0,300)"></app-wellness>
  <app-recipes id="recipes" [filler]="filler.slice(0,300)"></app-recipes>
  <app-about-us id="about-us" [filler]="filler.slice(0,300)"></app-about-us>
  <app-register id="register"></app-register>
  `
})
export class SectionsComponent implements OnInit, OnDestroy, AfterContentInit {
  scrollTimer: number | undefined = undefined;
  intersectionObserver: IntersectionObserver;
  sectionSubscription = Subscription.EMPTY;
  prevIntersection = {} as HTMLElement;
  sections: HTMLElement[] = [];
  startTouch = 0;

  constructor(private ref: ElementRef, private sectionService: SectionService) {
    // Initialize intersection observer
    this.intersectionObserver = new IntersectionObserver(this.onIntersect.bind(this), {
      root: ref.nativeElement,
      threshold: 0.5,
    });
  }

  ngAfterContentInit(): void {
    // Populate sections and attach observer
    const sectionCollection = this.ref.nativeElement.children;

    for (const child of sectionCollection) {
      this.sections.push(child);
      this.intersectionObserver.observe(child);
    }

    // Initialize section service
    this.sectionService.stepCount = this.sections.length - 1;
    this.sectionSubscription = this.sectionService.subscribe(this.onSectionStepChange.bind(this));
  }

  // LIFECYCLE
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Disconnect subscription + observer
    this.intersectionObserver.disconnect();
    this.sectionSubscription.unsubscribe();
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
      this.incrementStep(this.startTouch > touch);
      this.startTouch = 0;
    }

    this.handleScrollEnd();
  }

  // Mouse wheel
  @HostListener("wheel", ["$event"]) onWheel(e: WheelEvent) {
    
    // Scroll to next/prev if not already scrolling
    if (!this.scrollTimer && !e.ctrlKey) {
      e.preventDefault();
      this.incrementStep(e.deltaY > 0);
    }

    this.handleScrollEnd();
  }

  // Keydown
  @HostListener("window:keydown", ["$event"]) onKeyDown(e: KeyboardEvent) {
    const pressedKey = e.key;

    if (ACCEPT_KEYS.includes(pressedKey) && !e.ctrlKey) {
      e.preventDefault();
      // Arrow Up
      if (pressedKey === ACCEPT_KEYS[0]) {
        this.sectionService.currentStep = this.sectionService.stepCount;
      }
      // Arrow down
      else if (pressedKey === ACCEPT_KEYS[2]) {
        this.sectionService.currentStep = 0;
      }
      // Right or left
      else {
        this.incrementStep(pressedKey === ACCEPT_KEYS[1]);
      }
    }
  }

  // To ensure scrolling stops before navigating to another section
  // Mostly to handle smooth scrolling which takes forever to stop firing
  // TODO : Notify user when scrolling isn't possible
  handleScrollEnd() {
    window.clearTimeout(this.scrollTimer);

    const temp = this.scrollTimer = window.setTimeout(() => {
      if (temp === this.scrollTimer) {
        this.updateActiveSection();
        this.scrollTimer = undefined;
      }
    }, 100)
  }

  onIntersect(entries: IntersectionObserverEntry[]) {
    entries.forEach(e => {
      if (e.isIntersecting) {
        this.prevIntersection = e.target as HTMLElement;
      }
    })
  }

  onSectionStepChange(step: number) {
    // Scroll to section if not already there
    if (this.sections[step] !== this.prevIntersection) {
      const section = this.sections[step];

      section?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start"
      })

      this.handleScrollEnd();
    }
  }

  // Helper to increment/decrement sections
  // Possible errors currently handled within the service
  incrementStep(shouldIncrement: boolean) {
    this.sectionService.currentStep += shouldIncrement ? 1 : -1
  }

  setSectionStep(index: number) {
    this.sectionService.currentStep = index;
    this.updateActiveSection();
  }

  updateActiveSection() {
    this.sections.forEach((s, key) => {
      key === this.sectionService.currentStep
        ? s.classList.add("active")
        : s.classList.remove("active")
    })
  }

  // Fallback, not sure if this is needed
  onError() {
    throw new Error("Not implemeneted");
  }

  filler = fillerText
}
