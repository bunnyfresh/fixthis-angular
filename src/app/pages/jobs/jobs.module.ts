import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { JobsSmartTableComponent } from './smart-table/smart-table.component';
import { JobsService } from './jobs.service';
import {AddLayoutComponent} from './smart-table/AddLayoutComponent/add-layout.component';
import {ModifyLayoutComponent} from './smart-table/ModifyLayoutComponent/modify-layout.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    JobsSmartTableComponent,
    AddLayoutComponent,
    ModifyLayoutComponent,
  ],
  providers: [
    SmartTableService,
    JobsService,
  ],
})
export class JobsModule { }
