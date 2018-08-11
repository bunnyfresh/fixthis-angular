import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DashboardService} from './dashboard.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-chartjs-bar-horizontal',
  template: `
    <chart type="horizontalBar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarHorizontalComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;

  subscriptions: Subscription = new Subscription;

  chartData: any = [0, 0, 0, 0, 0, 0];

  constructor(private theme: NbThemeService, private _dashboardService: DashboardService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      const subscribtion = this._dashboardService.getGraphInfo().subscribe(response => {
        const responseData = response.data;

        this.chartData = [];

        this.chartData.push(responseData.total_jobs);
        this.chartData.push(responseData.draft_jobs);
        this.chartData.push(responseData.open_jobs);
        this.chartData.push(responseData.assigned_jobs);
        this.chartData.push(responseData.done_jobs);
        this.chartData.push(responseData.canceled_jobs);

        this.data = {
          labels: ['Total', 'Draft', 'Open', 'Assigned', 'Done', 'Canceled'],
          datasets: [{
            label: 'Jobs info',
            backgroundColor: colors.infoLight,
            borderWidth: 1,
            data: this.chartData,
          },
          ],
        };

      }, error => {

      });
      this.subscriptions.add(subscribtion);

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          rectangle: {
            borderWidth: 2,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          position: 'right',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
