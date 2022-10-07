import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,} from '@angular/core';

import * as echarts from 'echarts/core';
@Component({
  selector: 'download-plant',
  templateUrl: './download-plant.component.html',
  styleUrls: ['./download-plant.component.scss']
})
export class DownloadPlantComponent implements OnInit, OnChanges{
  dataSource: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  confirmOptionsForEchart(dataSource: any) {
    this.options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {color: 'white'}
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
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
