import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';

interface CardSettings {
  title: string;
  text: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, OnDestroy {

  private alive = true;

  private totalUsers: number = 0;
  private totalJobs: number = 0;
  private completedJobs: number = 0;

  subscriptions: Subscription = new Subscription;

  totalUsersCard: CardSettings = {
    title: 'Total Users',
    iconClass: 'fa fa-users',
    text: this.totalUsers.toString(),
    type: 'primary',
  };
  totalJobsCard: CardSettings = {
    title: 'Total Jobs',
    iconClass: 'ion-briefcase',
    text: this.totalJobs.toString(),
    type: 'success',
  };
  completedJobsCard: CardSettings = {
    title: 'Completed Jobs',
    iconClass: 'ion-checkmark-circled',
    text: this.completedJobs.toString(),
    type: 'warning',
  };

  statusCards: CardSettings[];

  commonStatusCardsSet: CardSettings[] = [
    this.totalUsersCard,
    this.totalJobsCard,
    this.completedJobsCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.totalUsersCard,
        type: 'primary',
      },
      {
        ...this.totalJobsCard,
        type: 'danger',
      },
      {
        ...this.completedJobsCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,
              private _dashboardService: DashboardService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes['default'];
    });
  }

  getGraphCount() {
    const me = this;
    const graphCountSubscription = this._dashboardService.getGraphCount().subscribe(response => {
      const responseData = response.data;
      me.totalUsers = responseData.total_users;
      me.totalJobs = responseData.total_jobs;
      me.completedJobs = responseData.completed_jobs;

      me.commonStatusCardsSet[0].text = this.totalUsers.toString();
      me.commonStatusCardsSet[1].text = this.totalJobs.toString();
      me.commonStatusCardsSet[2].text = this.completedJobs.toString();

    }, error => {

    });
    me.subscriptions.add(graphCountSubscription);
  }

  ngOnInit() {
    this.getGraphCount();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
