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



  constructor(private membreService: MembreService, private modeService: ModeService) {
    console.log("*******Membre component**********")
    this.memberId = this.membreService.getMemberId();
    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
    console.log("Membre ID  " + this.memberId)

  }

  ngOnInit(): void {
  }


  onSelectMembre(id: number): void {
    console.log("Membre ID 2" + id)
    console.log("On select membre ID   *****")
    this.membreService.setMemberId(id);
    console.log("Memeber ID" + this.membreService.getMemberId())
  }



}


