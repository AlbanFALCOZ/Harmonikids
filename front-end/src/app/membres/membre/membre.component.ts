import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { MembreService } from 'src/services/membre.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrl: './membre.component.scss'
})
export class MembreComponent {

  @Input()


    membre? : Membre
    memberId: string | null;

    @Output()
    membreSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private membreService: MembreService) {
      this.memberId = this.membreService.getMemberId();
        
    }

    ngOnInit(): void {
    }

 
    selectMembre(): void {
      this.membreSelected.emit(true);
  }

  onSelectMembre(id: string): void {
    this.membreService.setMemberId(id);
  }



}


