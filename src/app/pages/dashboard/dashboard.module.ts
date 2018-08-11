import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import {ChartjsBarHorizontalComponent} from './chartjs-bar-horizontal.component';
import {ChartModule} from "angular2-chartjs";

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ChartjsBarHorizontalComponent,
  ],
})
export class DashboardModule { }
