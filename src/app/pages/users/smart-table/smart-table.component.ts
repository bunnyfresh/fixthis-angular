import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { PasswordButtonComponent} from './change-password-button.component';
import { JobsButtonComponent} from './view-jobs-button.component';

import {UserService} from '../user.service';
import {ToasterConfig} from 'angular2-toaster';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class UsersSmartTableComponent {
  private JobsRenderComponent: any;

  data = [];

  config = new ToasterConfig({
    positionClass: 'toast-top-right',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: true,
    animation: 'fade',
    limit: 3,
  });

  settings = {
    actions: {
      edit: false,
      add: false,
    },
    add: {
      confirmAdd: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
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
        sortDirection: 'asc',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      location: {
        title: 'Location',
        type: 'string',
      },
      password: {
        title: 'Change password',
        type: 'custom',
        renderComponent: PasswordButtonComponent,
        filter: false,
      },
      jobs: {
        title: 'View Jobs',
        type: 'custom',
        renderComponent: JobsButtonComponent,
        filter: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private userService: UserService) {
    this.getUserDataFromAPI().subscribe(responce => {
      const data = responce;

      this.data = [];
      data.data.users.map(o => this.data.push({
          id: o.id,
          firstName: o.first_name,
          lastName: o.last_name,
          email: o.email,
          location: o.location,
          jobs: o.id,
      }));

      this.source.load(this.data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.userService.deleteUserAPI(event.data['id']).subscribe(responce => {
        if (responce.status == 200) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    }
  }

  onEditConfirm(event): void {
    /* this.userService.updateUserAPI(event.newData['id']).subscribe(responce => {
      if (responce.status == 200) {
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    });*/
    event.confirm.resolve(event.newData);
  }

  getUserDataFromAPI() {
    return this.userService.callGetAPI(10000, 1, null, null, null);
  }
}
