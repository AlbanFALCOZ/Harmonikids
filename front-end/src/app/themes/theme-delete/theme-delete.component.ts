import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrl: './theme-delete.component.scss'
})
export class ThemeDeleteComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  closeModalDelete() {
    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }
  }
}
