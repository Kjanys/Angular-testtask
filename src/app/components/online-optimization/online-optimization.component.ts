import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts/core';

import {HttpClient} from "@angular/common/http";

const Excel = require('exceljs');

@Component({
  selector: 'online-optimization',
  templateUrl: './online-optimization.component.html',
  styleUrls: ['./online-optimization.component.scss']
})

export class OnlineOptimizationComponent implements OnInit, OnChanges {
  dataSource: any;

  constructor(private http: HttpClient) {
  }

  getData(url: string) {
    return this.http.get<any>(url)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  confirmOptionsForEchart(dataSource: any) {
    this.options = {
      title: {
        textStyle: {color: 'white'},
        text: 'Пример графиков'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
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
        data: dataSource[0],
        textStyle: {color: 'white'}
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        type: "line",
        data: dataSource[1]
      },
        {
          type: "line",
          data: dataSource[2]
        }]
    }
  }
  @ViewChild('main')
  chartElement!: ElementRef;
  myChart: any;
  options: any;

  ngOnInit() {
    this.getData('assets/ex1.json').subscribe({
      next: (data) => {
        let x: string[] = [];
        let y: number[] = [];
        let x1: string[] = [];
        let y1: number[] = [];
        for (let i = 0; i < data[0].value.length; i++) {
          x.push(data[0].value[i].d)
          y.push(data[0].value[i].v)
        }
        for (let i = 0; i < data[1].value.length; i++) {
          x1.push(data[1].value[i].d)
          y1.push(data[1].value[i].v)
        }
        this.dataSource = [x, y, y1];
        this.confirmOptionsForEchart(this.dataSource);
        this.viewInit();
      }
    })
  }

  excelExp(): void{
    excelExport(this.dataSource);
  }

  viewInit() {
    if (this.chartElement && !this.myChart) {
      this.myChart = echarts.init(this.chartElement.nativeElement);
    }
    this.myChart.setOption(this.options);
  }
}

async function excelExport(dataSource: any) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Sheet");

  worksheet.columns = [
    {header: 'x', key: 'd'},
    {header: 'y', key: 'v'},
    {header: 'y1', key: 'v1'}
  ];
  for(let i = 0; i < dataSource[2].length; i++){
    worksheet.addRow(dataSource[0][i], dataSource[1][i], dataSource[2][i]);
  }

  await workbook.xlsx.writeBuffer('export.xlsx');
  console.log("Я создаль")
}
