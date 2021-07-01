import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from '../../services/datalocal.service';
import { ModalController } from '@ionic/angular';
import { ModalImgComponent } from '../modal-img/modal-img.component';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post={};
  @Input() enFavoritos;
  @Input() categoria;

  // guardarBorrarBtn: string | ActionSheetButton;

  // imagenes = ["http://192.168.43.232:8000/media/imagenes/blog/Post/59c2bfff-3410-4631-a7a8-09c6fb03decf.jpg",
  //             "http://192.168.43.232:8000/media/imagenes/blog/Post/59c2bfff-3410-4631-a7a8-09c6fb03decf.jpg",
  //             "http://192.168.43.232:8000/media/imagenes/blog/Post/4ef1dda8-f6ae-4793-a127-2be660436753.png",
  //             "http://192.168.43.232:8000/media/imagenes/blog/Post/4ef1dda8-f6ae-4793-a127-2be660436753.png",
  //             "http://192.168.43.232:8000/media/imagenes/blog/Post/4ef1dda8-f6ae-4793-a127-2be660436753.png"];
  constructor(private actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocal: DatalocalService,
              public modalController: ModalController) { }

  ngOnInit() {}
  async lanzarMenu(){

    let guardarBorrarBtn;
    if( this.enFavoritos ){
      // borrar
      guardarBorrarBtn = {
        text: 'Borrar de Favoritos',
        icon: 'trash',
        handler: () => {
          this.dataLocal.borrarPosts(this.post);
        }
      };
    }else{
      guardarBorrarBtn = {
        text: 'Agregar a Favoritos',
        icon: 'star',
        handler: () => {
          this.dataLocal.guardarPost(this.post);
        }
      };
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Artículo',
      cssClass: 'my-custom-class',
      buttons: [
        guardarBorrarBtn,
        {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          this.socialSharing.share(
            this.post.mensaje,
            this.post.owner.username,
            '',
            'http://localhost:8100',
          );
          console.log('Share clicked');
        }
      },  {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async abrirImg(image: string) {
    const modal = await this.modalController.create({
      component: ModalImgComponent,
      cssClass: 'my-custom-class',
      componentProps:{
        image
      }
    });
    return await modal.present();
  }

  //Fin de la clase
  }

