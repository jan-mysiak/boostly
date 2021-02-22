import { NavigationService } from './../core/services/navigation.service';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  intersectionObserver: IntersectionObserver;
  navSubscription?: Subscription;
  sections: Element[] = [];
  lastIntersection = -1;
  isScrolling: number | undefined;

  constructor(private ref: ElementRef, private navService: NavigationService) {
    this.intersectionObserver = new IntersectionObserver(this.onIntersect.bind(this), {
      root: ref.nativeElement,
      threshold: .7
    });

    if (navService.activeSection == -1) {
      this.navService.activeSection = 0;
    }
  }

  ngAfterViewInit(): void {
    for (const child of this.ref.nativeElement.children) {
      this.sections.push(child);
      this.intersectionObserver.observe(child);
    }

    // TODO: Match children with section registry

    this.navSubscription = this.navService.subscribe(
      this.onActiveSectionChange.bind(this),
      this.onError.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.navSubscription?.unsubscribe();
    this.intersectionObserver.disconnect();

    this.navService.activeSection = -1;
  }

  // LISTENER
  @HostListener("scroll") onScrollEnd() {
    window.clearTimeout(this.isScrolling);

    this.isScrolling = window.setTimeout(() => {
      this.navService.activeSection = this.lastIntersection;
    }, 60);
  }

  // METHODS
  onIntersect(e: IntersectionObserverEntry[]) {
    const entry = e[0];

    if (entry.isIntersecting) {
      this.lastIntersection = this.sections.indexOf(entry.target);
    }
  }

  onActiveSectionChange(index: number) {
    const elem = this.sections[index];

    if (!elem) {
      this.onError();
      return;
    }
    else if (this.lastIntersection != index) {
      elem.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
    }

    this.focusSection(elem);
  }

  focusSection(e: Element) {
    this.sections.forEach(s => {
      s == e
        ? s.classList.add("active")
        : s.classList.remove("active");
    })
  }

  // Fallback
  onError() {
    this.intersectionObserver.disconnect();
    this.navSubscription?.unsubscribe();
    this.sections.forEach(s => s.classList.add("active"));
  }
}
