import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { ModeService } from 'src/services/mode-ergo.service';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrl: './membre.component.scss'
})
export class MembreComponent {

  @Input()


  membre?: Membre
  memberId: number | undefined;
  isDisabled: boolean = false;

  @Output()
  membreSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private membreService: MembreService, private modeService: ModeService) {
    this.memberId = this.membreService.getMemberId();
    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });

  }

  ngOnInit(): void {
  }




  onSelectMembre(id: number): void {
    this.membreService.setMemberId(id);
  }



}


