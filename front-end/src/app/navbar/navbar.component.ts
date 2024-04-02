// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavVisible: boolean = false; 

  constructor(public colorService: ColorService) { }

  ngOnInit(): void {
  }

  toggleNav() {
    this.isNavVisible = !this.isNavVisible;
  }
}
