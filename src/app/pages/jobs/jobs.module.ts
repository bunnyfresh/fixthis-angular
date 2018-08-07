import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { JobsSmartTableComponent } from './smart-table/smart-table.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    JobsSmartTableComponent,
  ],
  providers: [
    SmartTableService,
  ],
})
export class JobsModule { }
