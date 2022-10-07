import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,} from '@angular/core';

import * as echarts from 'echarts/core';
@Component({
  selector: 'effective',
  templateUrl: './effective.component.html',
  styleUrls: ['./effective.component.scss']
})
export class EffectiveComponent implements OnInit, OnChanges{
  dataSource: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  confirmOptionsForEchart(dataSource: any) {
    this.options = {
      tooltip: {
        formatter: '{a} <br/>{b} : {c}%'
      },
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          progress: {
            show: true
          },
          detail: {
            valueAnimation: true,
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    };
  }

  @ViewChild('main')
  chartElement!: ElementRef;
  myChart: any;
  options: any;

  ngOnInit() {
    this.confirmOptionsForEchart([]);
    this.viewInit();
  }

  viewInit() {
    if (this.chartElement && !this.myChart) {
      this.myChart = echarts.init(this.chartElement.nativeElement);
    }
    this.myChart.setOption(this.options);
  }
}
