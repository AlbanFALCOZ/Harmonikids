import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-niveau-card',
  templateUrl: './niveau-card.component.html',
  styleUrl: './niveau-card.component.scss'
})
export class NiveauCardComponent {
  @Input() niveauName: string = '';

  @Output() niveauSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onNiveauSelected(niveau: string): void {
    this.niveauSelected.emit(niveau);
  } 
}
