/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Post, User, RespuestaPosts } from '../../interfaces/interfaces';
import { PruebasService } from '../../services/pruebas.service';
import { Router } from '@angular/router';

declare let window: any;
const URL = environment.url;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  tempImages = '';
  tempImagesBase64 = '';
  postsByUser: Post[]=[];
  habilitado=true;
  nextResult=false;
  numPages=1;
  numPageActual=0;
  pruebas: any[]=[];
  usuario: User={
    username:     '',
    email:        '',
    password1:    '',
    password2:    '',
    first_name:   '',
    last_name:    '',
    presentation: '',
    seguidores:   [],
    usuario_seguidores:   [],
    amigos:       [],
    age: 0,
    birthday: 0,
    height: 0,
    weight: 0,
  };
  segmentUser: string = 'user';
  constructor(private usuarioService: UsuarioService,
              private http: HttpClient,
              private loadingController: LoadingController,
              private uiServices: UiServiceService,
              private postService: PostsService,
              private camera: Camera,
              private pruebasService: PruebasService,
              private router: Router,
              ) {}
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
      console.log('Valores de usuario', this.usuario);
      this.usuarioService.userUpdate(this.usuario)
        .subscribe(user=>{
          this.usuario = user;
          this.uiServices.presentToast('Usuario actualizado');
          this.router.navigateByUrl('/main/tabs/tab4');
      },error=>{
        this.uiServices.presentToast('Ha ocurrido una error y no se pudo actualizar el usuario');
        });
      await loading.dismiss();
  }

}
