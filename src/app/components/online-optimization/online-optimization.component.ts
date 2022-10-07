import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,} from '@angular/core';

import * as echarts from 'echarts/core';
@Component({
  selector: 'online-optimization',
  templateUrl: './online-optimization.component.html',
  styleUrls: ['./online-optimization.component.scss']
})
export class OnlineOptimizationComponent implements OnInit, OnChanges{
  dataSource: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  confirmOptionsForEchart(dataSource: any) {
    this.options = {
      title: {
        textStyle: {color: 'white'},
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        textStyle: {color: 'white'}
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        textStyle: {color: 'white'}
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
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
