import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  isNavVisible: boolean = false;
  toggleNav(): void {
    this.isNavVisible = !this.isNavVisible;
  }

  
}
/* displayNav() {
  let nav = document.getElementById('nav-vertical') as HTMLElement;
  let icon = document.getElementById('menu') as HTMLElement;

  if (icon) {
    if (nav.style.display === 'none') {
      nav.style.display = 'block';

    } else {
      nav.style.display = 'none';
    }
  };
} */
