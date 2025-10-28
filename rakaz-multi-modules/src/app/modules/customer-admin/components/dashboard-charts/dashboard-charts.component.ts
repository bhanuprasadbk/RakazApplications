import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  @Input() chartOptions: Highcharts.Options = {};
  @Input() chartType!: 'area' | 'column' | 'pie' | 'bar' | 'line';
  @Input() chartHeight: string = '350px';
  
  constructor() {}

  ngOnInit(): void {} 
}
