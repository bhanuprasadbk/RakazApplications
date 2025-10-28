import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as Highcharts from 'highcharts';
import { SuperAdminService } from '../../../super-admin/services/super-admin.service';
import { CustomerAdminService } from '../../services/customer-admin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sensorTypes: any[] = [
    // { id: 1, name: 'Air' },
    // { id: 2, name: 'Water' },
    // { id: 3, name: 'Temperature' },
    // { id: 4, name: 'Humidity' },
  ];

  selectedSensorTypes: any[] = [1]; // Default selected "Air"

  customers = [
    // { id: 0, name: 'All' },
    // { id: 1, name: 'Fahed' },
    // { id: 2, name: 'Ahmed' },
    // { id: 3, name: 'Mohamed' },
    // { id: 4, name: 'Ali' },
    // { id: 5, name: 'Omar' },
    // { id: 6, name: 'Yousef' },
    // { id: 7, name: 'Ahmed' }, // duplicate from your list
  ];

  selectedCustomers: number[] = [1]; // Default selected "Fahed"

  groupedDeviceIds = [
    { id: 2324, name: '2324', group: 'Group A' },
    { id: 2325, name: '2325', group: 'Group A' },
    { id: 3001, name: '3001', group: 'Group B' },
    { id: 3002, name: '3002', group: 'Group B' },
    { id: 4001, name: '4001', group: 'Group C' },
  ];

  selectedDeviceIds: number[] = []; // Default none selected

  sensorParameterBreachedChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'white',
      scrollablePlotArea: {
        minWidth: 800,
        scrollPositionX: 1,
      },
    },
    title: { text: 'Sensor Parameter' },
    xAxis: {
      categories: [
        'Nitrogendioxide',
        'Pm25',
        'Biochemical',
        'Totaldissolvedsolids',
        'Ph',
        'Pm10',
        'Phosphate',
        'TDS',
        'DO',
        'SulfurDioxide',
        'Nitrate',
        'Ozone',
      ],
      title: { text: 'Sensor Parameter' },
      labels: {
        rotation: 0,
        style: {
          fontSize: '11px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: { text: 'Threshold Breached' },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Threshold Breached: <b>${this.y}</b>`;
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false,
        },
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Sensor Parameter',
        data: [
          { y: 25, color: '#5040B6' }, // Nitrogendioxide - dark purple-blue
          { y: 18, color: '#80B3FF' }, // Pm25 - light blue
          { y: 12, color: '#5040B6' }, // Biochemical - dark purple-blue
          { y: 15, color: '#80B3FF' }, // Totaldissolvedsolids - light blue
          { y: 22, color: '#5040B6' }, // Ph - dark purple-blue
          { y: 16, color: '#80B3FF' }, // Pm10 - light blue
          { y: 14, color: '#5040B6' }, // Phosphate - dark purple-blue
          { y: 19, color: '#80B3FF' }, // TDS - light blue
          { y: 13, color: '#5040B6' }, // DO - dark purple-blue
          { y: 17, color: '#80B3FF' }, // SulfurDioxide - light blue
          { y: 11, color: '#5040B6' }, // Nitrate - dark purple-blue
          { y: 20, color: '#80B3FF' }, // Ozone - light blue
        ],
      },
    ],
  };

  violationsChartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      backgroundColor: 'white',
      scrollablePlotArea: {
        minWidth: 800,
        scrollPositionX: 1,
      },
    },
    title: { text: '' },
    xAxis: {
      categories: [
        'Fahed',
        'Ahmed',
        'Mohamed',
        'Ali',
        'Omar',
        'Yousef',
        'Ahmed',
      ],
      title: { text: 'Customers' },
      labels: {
        rotation: 0,
        style: {
          fontSize: '11px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: { text: 'No of Violation' },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Violation: <b>${this.y}</b>`;
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: false,
        },
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        type: 'column',
        name: 'Customers',
        data: [
          { y: 25, color: '#5040B6' }, // Fahed - dark purple-blue
          { y: 18, color: '#80B3FF' }, // Ahmed - light blue
          { y: 12, color: '#5040B6' }, // Mohamed - dark purple-blue
          { y: 15, color: '#80B3FF' }, // Ali - light blue
          { y: 22, color: '#5040B6' }, // Omar - dark purple-blue
          { y: 16, color: '#80B3FF' }, // Yousef - light blue
          { y: 14, color: '#5040B6' }, // Ahmed - dark purple-blue
        ],
      },
    ],
  };

  deviceStatusChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'white',
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y} devices</b><br/>Percentage: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: ' devices',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '120%',
        innerSize: '50%',
        borderWidth: 2,
        borderColor: 'white',
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Sensor Types',
        data: [
          {
            name: 'Air',
            y: 12,
            color: '#7C3AED', // Medium purple
          },
          {
            name: 'Noise',
            y: 8,
            color: '#3B82F6', // Light blue
          },
          {
            name: 'Water',
            y: 5,
            color: '#EF4444', // Light red/pink
          },
        ],
      },
    ],
  };

  // Chart heights
  deviceStatusChartHeight = '160px';
  sensorParameterBreachedChartHeight = '350px';
  violationsChartHeight = '350px';
  parameterReadingChartHeight = '400px';

  // Parameter Reading Chart
  parameterList = [
    { id: 'pm25', name: 'PM2.5' },
    { id: 'pm10', name: 'PM10' },
    { id: 'no2', name: 'Nitrogen Dioxide' },
    { id: 'so2', name: 'Sulfur Dioxide' },
    { id: 'o3', name: 'Ozone' },
    { id: 'co', name: 'Carbon Monoxide' },
    { id: 'ph', name: 'pH' },
    { id: 'tds', name: 'Total Dissolved Solids' },
    { id: 'do', name: 'Dissolved Oxygen' },
    { id: 'temp', name: 'Temperature' },
    { id: 'humidity', name: 'Humidity' },
    { id: 'noise', name: 'Noise Level' }
  ];

  selectedParameter: string = 'pm25'; // Default to PM2.5

  // Sample data for different parameters
  parameterData: { [key: string]: { categories: string[], data: number[] } } = {
    pm25: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 40, 35]
    },
    pm10: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 50, 45]
    },
    no2: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [8, 10, 12, 15, 18, 22, 25, 28, 30, 32, 28, 24]
    },
    so2: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [5, 6, 8, 10, 12, 15, 18, 20, 22, 24, 20, 16]
    },
    o3: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 60, 55]
    },
    co: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 9, 7]
    },
    ph: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.6, 7.4]
    },
    tds: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 230, 220]
    },
    do: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [8.5, 8.8, 9.0, 9.2, 9.5, 9.8, 10.0, 10.2, 10.5, 10.8, 10.5, 10.0]
    },
    temp: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [22, 21, 20, 19, 21, 24, 27, 30, 32, 30, 28, 25]
    },
    humidity: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [65, 68, 70, 72, 60, 55, 50, 45, 40, 45, 50, 60]
    },
    noise: {
      categories: ['18 Mar', '19 Mar', '20 Mar', '21 Mar', '22 Mar', '23 Mar', '24 Mar', '25 Mar', '26 Mar', '27 Mar', '28 Mar', '29 Mar'],
      data: [45, 40, 35, 30, 50, 60, 70, 75, 80, 75, 65, 55]
    }
  };

  parameterReadingChartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      backgroundColor: 'white',
      scrollablePlotArea: {
        minWidth: 800,
        scrollPositionX: 1,
      },
    },
    title: { text: '' },
    xAxis: {
      categories: this.parameterData[this.selectedParameter].categories,
      title: { text: '' },
      labels: {
        rotation: 0,
        style: {
          fontSize: '11px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: { text: this.getParameterUnit(this.selectedParameter) },
    },
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>${this.series.name}: <b>${this.y}</b>`;
      },
    },
    plotOptions: {
      area: {
        fillOpacity: 0.3,
        lineWidth: 2,
        marker: {
          enabled: true,
          radius: 4,
        },
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'area',
        name: this.getParameterName(this.selectedParameter),
        data: this.parameterData[this.selectedParameter].data,
        color: '#5040B6',
      },
    ],
  };

  model: NgbDateStruct | undefined;
  tipContent = 'I am a tooltip';

  constructor(private superAdminService: SuperAdminService, private customerAdminService: CustomerAdminService) {

    
  }

  ngOnInit(): void {
    this.getSensors();
    this.getCustomerMappedToSensors(this.selectedSensorTypes);
  }

  getSensors() {
    this.superAdminService.getSensors().subscribe((res: any) => {
      this.sensorTypes = res.data;     
      console.log(this.sensorTypes);
    });
  }

  getCustomerMappedToSensors(sensor_type_id: any) {
    this.customerAdminService.getCustomerMappedToSensors(sensor_type_id).subscribe((res: any) => {
      this.customers = res.data;
      console.log(this.customers);
    });
  }

  // Helper method to get parameter name
  getParameterName(parameterId: string): string {
    const parameter = this.parameterList.find(p => p.id === parameterId);
    return parameter ? parameter.name : parameterId;
  }

  // Helper method to get parameter unit
  getParameterUnit(parameterId: string): string {
    const units: { [key: string]: string } = {
      pm25: 'μg/m³',
      pm10: 'μg/m³',
      no2: 'μg/m³',
      so2: 'μg/m³',
      o3: 'μg/m³',
      co: 'mg/m³',
      ph: 'pH',
      tds: 'mg/L',
      do: 'mg/L',
      temp: '°C',
      humidity: '%',
      noise: 'dB'
    };
    return units[parameterId] || '';
  }

  // Handle parameter dropdown change
  onParameterChange(selectedParameterId: string): void {
    this.selectedParameter = selectedParameterId;
    this.updateParameterChart();
  }

  // Update chart with selected parameter data
  updateParameterChart(): void {
    const data = this.parameterData[this.selectedParameter];
    
    this.parameterReadingChartOptions = {
      ...this.parameterReadingChartOptions,
      xAxis: {
        ...this.parameterReadingChartOptions.xAxis,
        categories: data.categories,
      },
      yAxis: {
        ...this.parameterReadingChartOptions.yAxis,
        title: { text: this.getParameterUnit(this.selectedParameter) },
      },
      series: [
        {
          type: 'area',
          name: this.getParameterName(this.selectedParameter),
          data: data.data,
          color: '#5040B6',
        },
      ],
    };
  }
}
