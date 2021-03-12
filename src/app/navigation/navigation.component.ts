import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectionService } from '../shared/services/section-service';

@Component({
  selector: 'app-navigation',
  styleUrls: ['./navigation.component.css'],
  template: `
  <app-menu 
    (goTo)="setSectionStep($event)" 
    (toggleMenu)="toggleMenu()" 
    [class.active]="menuOpen"
    [activeSection]="activeSection"
    >
  </app-menu>

  <app-header 
    (toggleMenu)="toggleMenu()" 
    [class.hidden]="menuOpen"
    [class.dark]="[1, 3].includes(activeSection)"
    [class.logo-hidden]="activeSection === 4"
    [class.brand-visible]="activeSection !== 0"
    >
  </app-header>
  
  <app-progress 
    [progress]="sectionProgress"
    [class.light]="[0, 2, 4].includes(activeSection)"
    [class.hidden]="menuOpen" 
    [class.text-hidden]="activeSection !== 0"
    (goHome)="setSectionStep(0)"
    >
  </app-progress>

  <div class="overlay" 
  [class.left]="overlay.left" 
  [class.right]="!overlay.left"
  [class.visible]="overlay.isActive"
  ></div>
  `
  // [class.light]="[0, 2, 4].includes(activeSection)"

})
export class NavigationComponent implements OnDestroy {
  sectionSubscription = Subscription.EMPTY;
  sectionProgress = 0;
  menuOpen = false;
  activeSection = 0;
  overlay: IOverlay = {} as IOverlay;

  constructor(private sectionService: SectionService) {
    this.sectionSubscription = sectionService.subscribe(this.onSectionStepChange.bind(this));
  }

  ngOnDestroy(): void {
    this.sectionSubscription.unsubscribe();
  }

  onSectionStepChange(step: number) {
    // Bit hacky - temporary
    const diff = Math.abs(step - this.activeSection);

    if (diff > 1) {
      this.overlay.left = step < this.activeSection;
      this.overlay.isActive = true;

      setTimeout(() => {
        this.overlay.isActive = false
      }, 600 + (diff * 50))
    }

    if (this.sectionService.stepCount) {
      this.sectionProgress = (step / this.sectionService.stepCount) * 100;
      this.activeSection = step;
    }
  }

  setSectionStep(step: number) {
    this.menuOpen = false;
    setTimeout(() => {
      this.sectionService.currentStep = step;
    }, 300)
  }

  toggleMenu = () => this.menuOpen = !this.menuOpen;
}

type IOverlay = {
  left: boolean,
  isActive: boolean
}
