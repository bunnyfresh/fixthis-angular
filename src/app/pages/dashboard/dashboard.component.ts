import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile' ;

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
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  totalUsersCard: CardSettings = {
    title: 'Total Users',
    iconClass: 'fa fa-users',
    text: '123',
    type: 'primary',
  };
  totalJobsCard: CardSettings = {
    title: 'Total Jobs',
    iconClass: 'ion-briefcase',
    text: '321',
    type: 'success',
  };
  completedJobsCard: CardSettings = {
    title: 'Completed Jobs',
    iconClass: 'ion-checkmark-circled',
    text: '123',
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

  constructor(private themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes['default'];
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
