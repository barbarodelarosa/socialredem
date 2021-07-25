import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaLogin, User } from '../interfaces/interfaces';
import { UiServiceService } from './ui-services.service';

const URL = environment.url;
const ENV = environment;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
access_token: string = null;
refresh_token: string = null;
access: string = null;
private usuario: any = {};
id='';
  constructor(private http: HttpClient,
              private uiServices: UiServiceService,
              private navCtrl: NavController) { }

  login(email: string, password: string){
    const data = {email, password};

    return new Promise( resolve=>{

      this.http.post<RespuestaLogin>(`${URL}${ENV.pathLogin}`,data)
      .subscribe(resp=>{
/*
        let headers: Headers = resp.headers;
        let pruebaheaders = headers.get('Set-Cookie');
        console.log('Prueba headers',pruebaheaders);*/
        if(resp.user){
          this.usuario = resp.user;
          this.guardarToken(resp.access_token, resp.refresh_token);
        }

        resolve(true);
      },error=>{
          console.log(error.error.non_field_errors);
          const mensajeError = error.error.non_field_errors;
          this.uiServices.alertaInformativa(mensajeError);
          this.access_token = null;
          this.refresh_token=null;
          this.id=null;
          //this.storage.remove('access_token');
          //this.storage.remove('refresh_token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('id');

          resolve(false);
      });

    });
  }

  async guardarToken(access_token: string, refresh_token: string){
    this.access_token = access_token;
    this.refresh_token = refresh_token;

    //await this.storage.set('access_token', access_token);
    await localStorage.setItem('access_token', access_token);
    //await this.storage.set('refresh_token', refresh_token);
    await localStorage.setItem('refresh_token', refresh_token);

  }

  async cargarToken(){
    this.access = await localStorage.getItem('access_token') || null;
  }
/*
 async validaToken(): Promise<boolean>{
   let tkn = await this.storage.get('access_token') || null;

   /*
   if(!this.access){
     this.navCtrl.navigateRoot('/login');
     return Promise.resolve(false);
    }

    tkn = 'Bearer '+ tkn;
    console.log(tkn);
    return new Promise<boolean>(resolve=>{

      console.log(tkn);
     let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tkn
       });

      console.log('Headers',httpHeaders);
      this.http.get(`${URL}/api/auth/user/`,{headers:httpHeaders})
      .subscribe(resp=>{
        console.log(resp);
        if(resp){
          this.usuario = resp;
          resolve(true);
        }
      },error=>{
        console.log(error);
        this.navCtrl.navigateRoot('/login');
        resolve(false);
      });
    });
  }

*/

  registro(usuario: User){

    const data = {email: usuario.email,
                  password1: usuario.password1,
                  password2: usuario.password2,
                  username: usuario.username};

    return new Promise( resolve=>{

      this.http.post<User>(`${URL}${ENV.pathRegister}`, data)
      .subscribe(resp=>{
        console.log(resp);
        if(resp){
          this.uiServices.presentToast(resp.detail);
        }
        resolve(true);
      },error=>{
          console.log(error.error.username);
          console.log(error.error.email);
          console.log(error.error.password1);
          console.log(error.error.password2);
          const username =  error.error.username || '';
          const email =  error.error.email || '';
          const password1 =  error.error.password1 || '';
          const password2 =  error.error.password2 || '';
          const mensajeError = `${username}<br>${email}<br>${password1}<br>${password2}`;
          this.uiServices.alertaInformativa(mensajeError);
          resolve(false);
      });

    });


  }


  async refreshToken(){
    const token = await localStorage.getItem('refresh_token');
    //const token = await this.storage.get('refresh_token');
    const data = {refresh: token};

    if (data.refresh){

      return new Promise( resolve=>{

        this.http.post<any>(`${URL}/api/auth/token/refresh/`, data)
        .subscribe(resp=>{
          console.log(resp);
          if(resp.access){
            this.guardarAccessToken(resp.access);
          }
          resolve(true);
        },error=>{
          console.log(error.detail);
            this.access = null;
            localStorage.removeItem('access_token');
            //this.storage.remove('access_token');
            localStorage.removeItem('refresh_token');
            //this.storage.remove('refresh_token');
            resolve(false);
        });

      });

    }else{
      return console.log('No hay refresh Token');
    }


  }

  async guardarAccessToken(access: string){
    this.access = access;
    await localStorage.setItem('access_token',access);
    //await this.storage.set('access_token', access);
  }


/*
  async validaToken(){

    try {
      const accessToken = await this.storage.get('access_token');
      const auth = 'Bearer '+ accessToken;
      console.log(auth);

      const params = {};
      const options = {
        headers: new HttpHeaders({

        Authorization: auth,


      })};
      const response = await this.http.get(`${URL}/api/auth/user/`, options);

      console.log(response);
      console.log(response); // JSON data returned by server
      console.log(response);
      console.log('El parecer esta ok');
    } catch (error) {
      console.log('Error');
      console.error(error.status);
      console.error(error.error); // Error message as string
      console.error(error.headers);
    }

}
*/

async validaToken(){
  const token = localStorage.getItem('access_token');
   return new Promise<boolean>(resolve=>{
     this.http.post<any>(`${URL}/api/auth/token/verify/`,{
      token
     }).subscribe(resp=>{
      //  console.log(resp.status);
       if(resp){
         //this.usuario = resp;
         resolve(true);
       }
     },(error: HttpErrorResponse)=>{
        // console.log(error.status);
       this.navCtrl.navigateRoot('/login');
       resolve(false);
     });
   });
 }


 userUpdate(usuario: User){
  // SE DEBE ACTUALIZAR EL USUARIO EN LA BASE DE DATOS Y EN LOCALSTORAGE
  console.log('La data es', usuario);
  
  return this.http.put<User>(`${URL}${ENV.pathGetUser}`,usuario);

}


crearPerfilUsuario(perfil){

    return new Promise( resolve=>{

    this.http.post(`${URL}/api/v1/perfil/`, perfil)
    .subscribe(resp=>{
    console.log(resp);
    console.log('Perfil Registrado');

    resolve(true);
    },error=>{

    resolve(false);
    });

});
}


getUser(){
  return this.http.get<User>(`${URL}${ENV.pathGetUser}`);
}





resetPassword(rPassword){

  const data = {email:rPassword.email};

  return new Promise( resolve=>{

    this.http.post<any>(`${URL}${ENV.pathResetPassword}`, data)
    .subscribe(resp=>{
      console.log(resp);
      if(resp){
        this.uiServices.alertaInformativa(resp.detail);
      }
      resolve(true);
    },error=>{
        console.log(error);
        this.uiServices.alertaInformativa(error);
        resolve(false);
    });

  });


}







retablecerContrasena(rContrasena){

  const data = {uidb64: rContrasena.codigo1,
                token: rContrasena.codigo2,
                password: rContrasena.password1};

  return new Promise( resolve=>{
    this.http.put(`${URL}${ENV.pathPasswordResetConfirm}${data.uidb64}/${data.token}/`, data)
    .subscribe(resp=>{
      if(resp){
        this.uiServices.presentToast('Se ha restablecido su contraseña');
      }
      resolve(true);
    },error=>{
        console.log(error);
        this.uiServices.alertaInformativa(error);
        resolve(false);
    });

  });


}

logout(){
  this.access_token = null;
  this.refresh_token= null;
  this.access       = null;
  this.usuario      = {};
  this.id           = null;

  localStorage.clear();
  this.navCtrl.navigateRoot('/login', {animated: true});
}



// ######## Cierre de la clase ######
}
