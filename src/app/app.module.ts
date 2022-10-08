import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {DevExtremeModule, DxPieChartModule} from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainContentComponent} from "./components/main-content/main-content.component";
import {HeaderComponent} from "./components/header/header.component";
import {RecomendationComponent} from "./components/recomendation/recomendation.component";
import {MatMenuModule} from '@angular/material/menu';
import {EffectiveComponent} from "./components/effective/effective.component";
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DownloadPlantComponent} from "./components/download-plant/download-plant.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { NgxEchartsModule } from 'ngx-echarts';
import {EcpChangesComponent} from "./components/ecp-changes/ecp-changes.component";
import {HttpClientModule} from "@angular/common/http";
import {OnlineOptimizationComponent} from "./components/online-optimization/online-optimization.component";
import * as echarts from 'echarts/core';

import {
  DxListModule,
  DxScrollViewModule
} from "devextreme-angular";

import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { LineChart, PieChart, GaugeChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';




echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GaugeChart,
  GridComponent,
  DataZoomComponent,
  LineChart,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  UniversalTransition
]);

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent,
    HeaderComponent,
    OnlineOptimizationComponent,
    DownloadPlantComponent,
    EffectiveComponent,
    RecomendationComponent,
    EcpChangesComponent
  ],
  imports: [
    BrowserModule,
    DxPieChartModule,
    DxScrollViewModule,
    HttpClientModule,
    DxListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    DevExtremeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
