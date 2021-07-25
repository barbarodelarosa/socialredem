/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare let window: any;
const URL = environment.url;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  tempImages = '';
  tempImagesBase64 = '';

  //SINO DECLARO EL TIPO DE OBJETO USER DA ERROR AL CARGAR LA PAGINA
  usuario: User={
    username: '',
    email: '',
    
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  };

  constructor(private usuarioService: UsuarioService,
              private http: HttpClient,
              private loadingController: LoadingController,
              private uiServices: UiServiceService,
              private postService: PostsService,
              private camera: Camera) {}
  async ngOnInit(){
   await this.getUser();
  }

 getUser(){
    this.usuarioService.getUser().subscribe(usuario=>{
      this.usuario=usuario;
    },error=>{
      this.uiServices.presentToast('No se pudo cargar su información de usuario');
    });
 }

async userUpdate(fUserUpdate: NgForm){
    if(fUserUpdate.invalid){return;}
    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      //duration: 2000
    });
    await loading.present();
    this.usuarioService.userUpdate(fUserUpdate.value)
      .subscribe(user=>{
        this.usuario = user;
      this.uiServices.presentToast('Usuario actualizado');
    },error=>{
      this.uiServices.presentToast('Ha ocurrido una error y no se pudo actualizar el usuario');
      });
    await loading.dismiss();
}

  logout(){
    this.postService.paginaPost=0;
    this.usuarioService.logout();
    this.uiServices.presentToast('Se ha cerrado la sesión');

  }
  onClick(){}

  galeria(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.procesarImagen(options);
  }
  procesarImagen(   options: CameraOptions){
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const img = window.Ionic.WebView.convertFileSrc(base64Image);
      this.tempImages=img;
      this.tempImagesBase64 =JSON.stringify(base64Image);
      // this.postService.uploadImage(10,base64Image);
      // this.postService.subirImagen(24, base64Image);
    }, (err) => {
      // Handle error
    });
  }

}
