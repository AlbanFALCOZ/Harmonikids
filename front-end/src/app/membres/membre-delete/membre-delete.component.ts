import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-membre-delete',
  templateUrl: './membre-delete.component.html',
  styleUrl: './membre-delete.component.scss'
})
export class MembreDeleteComponent implements OnInit {

  @Output() membreDelete = new EventEmitter<void>();

  
  constructor() { }

  ngOnInit(): void {
  }

  onMembreDelete() {
    this.membreDelete.emit();
    this.closeModalDelete()
  }

  closeModalDelete() {

    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }
    

  }
}
