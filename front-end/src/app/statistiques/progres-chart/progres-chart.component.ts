import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatistiqueService } from 'src/services/statistique.service';

@Component({
  selector: 'app-progres-chart',
  templateUrl: './progres-chart.component.html',
  styleUrl: './progres-chart.component.scss'
})
export class ProgresChartComponent {
  public options: any = {
    chart: {
      type: 'area',
      height: 400
    },
    title: {
      text: 'Progrès de l\'enfant par rapport aux autres'
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
        text: 'Progrès'
      }
    },
    series: []
  };

  constructor(private progressService: StatistiqueService) { }

  ngOnInit(): void {
    this.progressService.getProgressData().subscribe(data => {
      this.options.xAxis.categories = data.categories;
      this.options.series = [
        { name: 'Progrès de l\'enfant', data: data.childProgress },
        { name: 'Progrès moyen des autres enfants', data: data.averageProgress }
      ];
      Highcharts.chart('myChart', this.options);
    });
  }

}
