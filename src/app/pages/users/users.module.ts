import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { UsersSmartTableComponent } from './smart-table/smart-table.component';
import { PasswordButtonComponent } from './smart-table/change-password-button.component';
import { JobsButtonComponent } from './smart-table/view-jobs-button.component';
import { ToasterModule } from 'angular2-toaster';
import {UserService} from './user.service';
import {AddLayoutComponent} from './smart-table/AddLayoutComponent/add-layout.component';
import {ModifyLayoutComponent} from './smart-table/ModifyLayoutComponent/modify-layout.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    UsersSmartTableComponent,
    PasswordButtonComponent,
    JobsButtonComponent,
    AddLayoutComponent,
    ModifyLayoutComponent,
  ],
  entryComponents: [PasswordButtonComponent, JobsButtonComponent],
  providers: [
    SmartTableService,
    UserService,
  ],
})
export class UsersModule { }
