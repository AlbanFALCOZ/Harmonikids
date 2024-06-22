import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Membre } from '../../../models/membre.model';
import { MembreService } from 'src/services/membre.service';
import { ModeService } from 'src/services/mode-ergo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membre',
  templateUrl: './membre.component.html',
  styleUrls: ['./membre.component.scss']
})
export class MembreComponent implements OnInit {

  @Input() membre?: Membre;
  memberId: number | undefined;
  isDisabled: boolean = false;
  selectedMembre: Membre | null = null;

  @Output() membreToDelete: EventEmitter<Membre> = new EventEmitter<Membre>();

  constructor(
    private membreService: MembreService,
    private modeService: ModeService,
    private router: Router
  ) {
    this.modeService.isDisabled$.subscribe(isDisabled => {
      this.isDisabled = isDisabled;
    });
  }

  ngOnInit(): void {
    this.memberId = this.membreService.getMemberId();
  }


  onSelectMember(id: number) {
    this.membreService.setMemberId(id);
    this.router.navigate([this.isDisabled ? '/dashboard' : '/statistiques', id]);
  }

  displayModalDelete() {
    this.membreToDelete.emit(this.membre);
    const modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "block";


      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    }
  }

  closeModalDelete() {
    const modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }
  }
  
}
