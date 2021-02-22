import { NavigationService } from './../services/navigation.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { faHome, faAppleAlt, faInfoCircle, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  activeSection = 0;
  menuActive = false;
  navSubscription: Subscription;

  constructor(private navService: NavigationService) {
    this.navSubscription = navService.subscribe((val) => this.activeSection = val);
  }

  ngOnDestroy(): void {
    this.navSubscription.unsubscribe();
  }

  setActiveSection(index: number) {
    this.navService.activeSection = index;
    this.menuActive && this.toggleMenu();
  }

  toggleMenu = () => this.menuActive = !this.menuActive;

  getSectionProgress() {
    const progress = [4, 13, 21];
    return progress[this.activeSection] ? progress[this.activeSection] : 0;
  }

  // homeIcon = faHome;
  // wellnessIcon = faAppleAlt;
  // aboutUsIcon = faInfoCircle;
  // registerIcon = faHeart;
}
