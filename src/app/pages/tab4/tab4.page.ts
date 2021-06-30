import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { environment } from '../../../environments/environment';
import { LoadingController } from '@ionic/angular';
import { UiServiceService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';

const URL = environment.url;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {

  //SINO DECLARO EL TIPO DE OBJETO USER DA ERROR AL CARGAR LA PAGINA
  usuario: User={ 
    username: '',
    email: '',
    avatar: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: ''
  };

  constructor(private usuarioService: UsuarioService,
              private http: HttpClient,
              private loadingController: LoadingController,
              private uiServices: UiServiceService,
              private postService: PostsService) {}
  async ngOnInit(){
   await this.getUser();
  }

 getUser(){
    this.usuarioService.getUser().subscribe(usuario=>{
      this.usuario=usuario
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
    this.usuarioService.userUpdate(this.usuario)
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

}
