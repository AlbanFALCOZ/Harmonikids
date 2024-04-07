import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Membre } from 'src/models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { TitleService } from 'src/services/title.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-membre-liste',
  templateUrl: './membre-liste.component.html',
  styleUrl: './membre-liste.component.scss'
})
export class MembreListeComponent implements OnInit {

  public membreListe: Membre[] = [];
  public displayForm: boolean = false;
  isDisabled: boolean = false;
 

  constructor(private router: Router, public membreService: MembreService , public titleService: TitleService) {
    this.membreService.membres$.subscribe((membres: Membre[]) => {
      this.membreListe = membres;
    });
    this.titleService.title = 'Bienvenue';
    this.titleService.search = 'Rechercher un enfant';

  }
  
  ngOnInit(): void {
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

 

}


