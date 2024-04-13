import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';
import { MembreService } from 'src/services/membre.service';
import { NavbarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  memberId: string | undefined;
  
  isNavVisible = false;

  constructor(public colorService: ColorService, public membreService: MembreService, private navbarService: NavbarService) { 
    this.navbarService.isNavbarVisible$.subscribe(isVisible => {
      this.isNavVisible = isVisible;
    });
  }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId();
  }

  toggleNav() {
    this.navbarService.toggleNavbarVisibility();
  }

  onNavbarClicked(): void {
    this.toggleNav();
  }
}
