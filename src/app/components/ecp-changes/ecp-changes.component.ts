import {Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild} from '@angular/core';
import * as echarts from "echarts/core";
import {HttpClient} from "@angular/common/http";

;

@Component({
  selector: 'ecp-changes',
  templateUrl: './ecp-changes.component.html',
  styleUrls: ['./ecp-changes.component.scss']
})
export class EcpChangesComponent implements OnInit, OnChanges{
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
        trigger: 'axis'
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
        textStyle: {color: 'white'},
        data: dataSource[0]
      },
      yAxis: {
        type: 'value',
      },
      series:{type:"line",
        data: dataSource[1]
       }
    }
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
