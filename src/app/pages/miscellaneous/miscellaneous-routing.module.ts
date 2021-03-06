import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiscellaneousComponent } from './miscellaneous.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';

const routes: Routes = [{
  path: '',
  component: MiscellaneousComponent,
  children: [{
    path: '404',
    component: NotFoundComponent,
  }, {
    path: 'comingSoon',
    component: ComingSoonComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscellaneousRoutingModule { }

export const routedComponents = [
  MiscellaneousComponent,
  NotFoundComponent,
  ComingSoonComponent,
];
