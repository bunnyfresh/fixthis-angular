import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { JobsService} from '../jobs.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class JobsSmartTableComponent {

  settings = {
    actions: {
      edit: false,
      add: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      author: {
        title: 'Posted by',
        type: 'string',
      },
      price: {
        title: 'Job Price',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
      },
      date: {
        title: 'Posted date',
        type: 'string',
      },
      activity: {
        title: 'Activity status',
        type: 'number',
      },
    },
  };

  data = [];

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private jobsService: JobsService) {
    this.getJobsDataFromAPI().subscribe(responce => {
      const data = responce;

      this.data = [];
      data.data.jobs.map(o => this.data.push({
        id: o.id,
        author: o.userId,
        price: o.task_price,
        location: o.location,
        date: o.task_post_date,
        activity: o.activity_status,
      }));

      this.source.load(this.data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.jobsService.deleteJobAPI(event.data['id'], event.data['user_id']).subscribe(responce => {
        if (responce.status == 200) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
      event.confirm.resolve();
    }
  }

  getJobsDataFromAPI() {
    return this.jobsService.getAllJobs(10000, 1, null, null, null);
  }
}
