import { Component } from '@angular/core';
import { Game } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrl: './historique.component.scss'
})
export class HistoriqueComponent {
  games: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.games = this.gameService.getPreviousGames();
  }

}
