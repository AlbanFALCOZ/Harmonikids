import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { ModeService } from 'src/services/mode-ergo.service';
import { Router } from '@angular/router';

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
  membreToDelete: EventEmitter<Membre> = new EventEmitter<Membre>();



  constructor(private membreService: MembreService, private modeService: ModeService, private router: Router) {
    this.memberId = this.membreService.getMemberId();
    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });

  }

  ngOnInit(): void {
  }



  onDeleteMembre() {
    if (this.membre) {
      this.membreToDelete.emit(this.membre);
    }
  }

  onSelectMember(id: number) {
    this.membreService.setMemberId(id);
    this.router.navigate(['/dashboard', id]);
  }

  displayModalUpdate() {
    // this.membreToDelete.emit(this.membre);
    var modal = document.getElementById("myModalUpdate");
    if (modal) {
      modal.style.display = "block";

      window.onclick = function (event) {
        if (event.target == modal && (modal)) {
          modal.style.display = "none";
        }
      }
    }
  }

  closeModalDelete() {

    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }

  }


}


