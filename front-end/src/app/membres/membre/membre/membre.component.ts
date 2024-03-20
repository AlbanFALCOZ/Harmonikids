import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Membre } from '../../../../models/membre.model';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  
  styleUrl: './membre.component.scss'
})
export class MembreComponent {

  @Input()


    membre? : Membre

    @Output()
    membreSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
        
    }

    ngOnInit(): void {
    }

 
    selectMembre(): void {
      this.membreSelected.emit(true);
  }



}


