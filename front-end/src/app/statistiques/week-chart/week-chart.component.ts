import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatistiqueService } from 'src/services/statistique.service';

@Component({
  selector: 'app-week-chart',
  templateUrl: './week-chart.component.html',
  styleUrls: ['./week-chart.component.scss']
})
export class WeekChartComponent implements OnInit {

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

  constructor(private statistiqueService: StatistiqueService) { }

  ngOnInit(): void {
    this.statistiqueService.getWeeklyQuizData().subscribe(data => {
      this.options.xAxis.categories = data.weeks;
      this.options.series = [
        { name: 'Quiz faciles par semaine', data: data.quizFacilesCounts },
        { name: 'Quiz moyens par semaine', data: data.quizMoyensCounts },
        { name: 'Quiz difficiles par semaine', data: data.quizDifficilesCounts }
      ];
      Highcharts.chart('container', this.options);
    });
  }
}

