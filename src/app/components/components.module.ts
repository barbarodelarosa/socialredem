import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ModalImgComponent } from './modal-img/modal-img.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    ModalImgComponent
  ],
  exports:[
    PostsComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
