import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { PruebasComponent } from './pruebas/pruebas.component';
import { PruebaImcComponent } from './prueba-imc/prueba-imc.component';
import { CrearPruebaImcComponent } from './crear-prueba-imc/crear-prueba-imc.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    ModalImgComponent,
    PruebaImcComponent,
    PruebasComponent,
    CrearPruebaImcComponent
  ],
  exports:[
    PostsComponent,
    PostComponent,
    ModalImgComponent,
    PruebasComponent,
    CrearPruebaImcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
