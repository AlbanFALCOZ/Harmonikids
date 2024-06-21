import { Component, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Game } from 'src/models/game.model';
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';

@Component({
  selector: 'app-progres-chart',
  templateUrl: './progres-chart.component.html',
  styleUrls: ['./progres-chart.component.scss'] // Correction de styleUrl en styleUrls
})
export class ProgresChartComponent implements OnInit, OnChanges {

  categories: string[] = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
  memberId: number = 0;
  childGames: Game[] = [];
  otherGames: Game[] = [];

  public options: any = {
    chart: {
      type: 'area',
      height: 400
    },
    title: {
      text: 'Progrès de l\'enfant par rapport aux autres'
    },
    xAxis: {
      categories: this.categories,
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      tickmarkPlacement: 'on',
      title: {
        text: 'Progrès'
      }
    },
    series: []
  };

  constructor(
    private gameService: GameService,
    private memberService: MembreService
  ) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnChanges(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.memberId = this.memberService.getMemberId();
    this.gameService.getGamesByChildId(this.memberId).then(childGames => {
      this.childGames = childGames;
      const childProgress = this.calculateWeeklyProgress(this.childGames);

      this.gameService.getAllGames().subscribe(allGames => {
        this.otherGames = allGames.filter(game => game.childId !== this.memberId);
        const averageProgress = this.calculateWeeklyProgress(this.otherGames, true);

        this.options.series = [
          { name: 'Progrès de l\'enfant', data: childProgress },
          { name: 'Progrès moyen des autres enfants', data: averageProgress }
        ];

        Highcharts.chart('myChart', this.options);
      });
    });
  }

  private calculateWeeklyProgress(games: Game[], isAverage: boolean = false): number[] {
    const weeklyProgress = [0, 0, 0, 0];

    games.forEach((game, index) => {
      const weekIndex = index % 4;
      weeklyProgress[weekIndex] += game.correctFirstAttemptCount;
    });

    if (isAverage && games.length > 0) {
      return weeklyProgress.map(progress => progress / games.length);
    }

    return weeklyProgress;
  }
}
