import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,} from '@angular/core';

import * as echarts from 'echarts/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'effective',
  templateUrl: './effective.component.html',
  styleUrls: ['./effective.component.scss']
})
export class EffectiveComponent implements OnInit, OnChanges{
  dataSource: any;

  constructor(private http:HttpClient) {
  }

  getData(url: string){
    return this.http.get<any>(url)
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
              value: dataSource[1][0],
              name: dataSource[0][0]
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
    this.getData('assets/ex1.json').subscribe({
      next:(data) => {
        let x: string[] = [];
        let y: number[] = [];
        for(let i = 0; i < data[0].value.length; i++){
          x.push(data[0].value[i].d)
          y.push(data[0].value[i].v)
        }
        this.dataSource = [x, y];
        this.confirmOptionsForEchart(this.dataSource);
        this.viewInit();
      }
    })
  }

  viewInit() {
    if (this.chartElement && !this.myChart) {
      this.myChart = echarts.init(this.chartElement.nativeElement);
    }
    this.myChart.setOption(this.options);
  }
}
