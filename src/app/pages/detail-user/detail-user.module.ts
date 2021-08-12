import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailUserPageRoutingModule } from './detail-user-routing.module';

import { DetailUserPage } from './detail-user.page';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailUserPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetailUserPage]
})
export class DetailUserPageModule {}
