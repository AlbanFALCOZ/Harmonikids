import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Membre } from 'src/models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { TitleService } from 'src/services/title.service';
import { SonService } from 'src/services/sound.service';


@Component({
  selector: 'app-membre-liste',
  templateUrl: './membre-liste.component.html',
  styleUrl: './membre-liste.component.scss'
})
export class MembreListeComponent implements OnInit {

  public membreListe: Membre[] = [];
  membreListeDisplayed: Membre[] = [];
  public displayForm: boolean = false;
  isDisabled: boolean = false;

  search: string = '';

  constructor(private router: Router, public membreService: MembreService , public titleService: TitleService , private sonService: SonService) {
    this.membreService.membres$.subscribe((membres: Membre[]) => {
      this.membreListe = membres;
      this.membreListeDisplayed = membres;
    });
    this.titleService.title = 'Bienvenue';
    this.titleService.search = 'Rechercher un enfant';
    

  }
  
  ngOnInit(): void {
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }


  playSound(){
    this.sonService.playSound('./../../../../assets/img/good.mp3');
  }
 
  onKey(event: any) {
    this.membreListeDisplayed = this.membreListe.filter(membre => membre.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || membre.lastName.toLowerCase().includes(event.target.value.toLowerCase()));
  }

}


