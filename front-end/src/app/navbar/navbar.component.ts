
import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/services/color-service.service';
import { MembreService } from 'src/services/membre.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isNavVisible: boolean = false; 
  memberId: string | undefined;

  constructor(public colorService: ColorService , public membreService: MembreService) { }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId(); 
  }

  toggleNav() {
    this.isNavVisible = !this.isNavVisible;
  }

  
}
