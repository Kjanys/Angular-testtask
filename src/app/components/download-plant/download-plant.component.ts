import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,} from '@angular/core';

import {HttpClient} from "@angular/common/http";

import * as echarts from 'echarts/core';
@Component({
  selector: 'download-plant',
  templateUrl: './download-plant.component.html',
  styleUrls: ['./download-plant.component.scss']
})
export class DownloadPlantComponent implements OnInit, OnChanges{
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
          data: dataSource
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
        let x: any[] = [];
        for(let i = 0; i < data[1].value.length; i++){
          x.push({ value: data[1].value[i].v, name: data[1].value[i].d })
        }
        this.dataSource = x;
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
