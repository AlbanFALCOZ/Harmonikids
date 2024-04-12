import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrl: './theme-delete.component.scss'
})
export class ThemeDeleteComponent implements OnInit {

  @Output() deleteTheme = new EventEmitter<void>();

  
  constructor() { }

  ngOnInit(): void {
  }

  themeDelete() {
    console.log('send delete theme');
    this.deleteTheme.emit();
    this.closeModalDelete()
  }

  closeModalDelete() {

    var modal = document.getElementById("myModalDelete");
    if (modal) {
      modal.style.display = "none";
    }

  }
}
