import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Game } from 'src/models/game.model';
import { Quiz } from 'src/models/quiz.model';
import { GameService } from 'src/services/game.service';
import { MembreService } from 'src/services/membre.service';
import { QuizService } from 'src/services/quiz.service';

@Component({
  selector: 'app-week-chart',
  templateUrl: './week-chart.component.html',
  styleUrls: ['./week-chart.component.scss']
})
export class WeekChartComponent implements OnInit {

  quizList: Quiz[] = [];
  games: Game[] = [];
  QuizListSorted: Quiz[] = [];
  memberId: number = 0;

  public options: any = {
    chart: {
      type: 'area',
      height: 400
    },
    title: {
      text: 'Nombre de quiz par semaine'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: [],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    series: []
  };

  constructor(private quizService: QuizService, private gameService: GameService, private memberService: MembreService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnChanges(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    this.memberId = this.memberService.getMemberId();
    this.gameService.getGamesByChildId(this.memberId).then(childGames => {
      this.games = childGames;

      const quizIds = this.games.map(game => game.quizId);

      this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
        this.quizList = quizzes.filter(quiz => quizIds.includes(quiz.id));
        this.QuizListSorted = this.quizList;

        const weeks = ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'];
        const quizFacilesCounts = this.calculateWeeklyCounts('Facile');
        const quizMoyensCounts = this.calculateWeeklyCounts('Moyen');
        const quizDifficilesCounts = this.calculateWeeklyCounts('Difficile');

        this.options.xAxis.categories = weeks;
        this.options.series = [
          { name: 'Questions faciles par semaine', data: quizFacilesCounts },
          { name: 'Questions moyennes par semaine', data: quizMoyensCounts },
          { name: 'Questions difficiles par semaine', data: quizDifficilesCounts }
        ];
        Highcharts.chart('container', this.options);
      });
    });
  }

  private calculateWeeklyCounts(level: string): number[] {
    const counts: number[] = [0, 0, 0, 0];

    this.QuizListSorted.forEach((quiz, index) => {
      const count = quiz.questions.filter(question => question.niveau === level).length;
      const weekIndex = this.getWeekIndex(index);
      counts[weekIndex] += count;
    });

    return counts;
  }

  private getWeekIndex(index: number): number {
    return index % 4;
  }
}
