import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPostPage } from './detail-post.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPostPageRoutingModule {}
