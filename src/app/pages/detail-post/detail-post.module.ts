import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPostPageRoutingModule } from './detail-post-routing.module';

import { DetailPostPage } from './detail-post.page';
import {AutosizeModule} from 'ngx-autosize';
import { ComponentsModule } from '../../components/components.module';

import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPostPageRoutingModule,
    AutosizeModule,
    ComponentsModule,
    PipesModule

  ],
  declarations: [DetailPostPage]
})
export class DetailPostPageModule {}
