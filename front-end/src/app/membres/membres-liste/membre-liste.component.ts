import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';
import { Membre } from 'src/models/membre.model';

@Component({
  selector: 'app-membre-liste',
  templateUrl: './membre-liste.component.html',
  styleUrl: './membre-liste.component.scss'
})
export class MembreListeComponent implements OnInit {

  public membreListe: Membre[] = [];
  public displayForm: boolean = false;
 

 
  

  constructor(private router: Router) {


    this.membreListe = [
        {
          id: '1',
          firstName: 'Alice',
          lastName : 'Routine' , 
          age : '8ans',
          description: 'Je veux apprendre',
          image : './../../../../assets/img/alice.jpg'
          
        },
        {
          id: '2',
          firstName: 'Lucas',
          age : '10ans',
          lastName : 'Distrait' , 
          description: 'Je ne veux pas apprendre',
          image : './../../../../assets/img/lucas.jpg'
          
        },
        {
          id: '3',
          firstName: 'Léo',
          lastName : 'Vivace' ,
          age:'10ans',
          description: 'Je veux manger',
          image : './../../../../assets/img/léo.jpg'
        },
        
      
      ];
  }
  
  ngOnInit(): void {
  }

  toggleForm() {
    this.displayForm = !this.displayForm;
  }

 

}
