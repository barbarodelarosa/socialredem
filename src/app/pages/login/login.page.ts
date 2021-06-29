import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, LoadingController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal') slides: IonSlides;

  registroUsuario: User={
    email:'',
    username:'',
    password1:'',
    password2:'',
  };
  fLogin: NgForm;
  rContrasena: NgForm;
  fRegistro: NgForm;
  rPassword: NgForm;
  loginUser={
    email: '',
    password: '',
  };
  resetPasswordObject={
    email:''
  };


  confirmResetPasswordObject={
    codigo1:'',
    codigo2:'',
    password1:'',
    password2:''
  };

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiServices: UiServiceService,
    private loadingController: LoadingController) { }
  ionViewDidEnter() {
      this.slides.lockSwipes(true);
    }
  ngOnInit() {
  }
  // LOGIN
  async login(fLogin: NgForm){

    if(fLogin.invalid){return;}

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      //duration: 2000
    });
    await loading.present();

   const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
   await loading.dismiss();
   if(valido){

      // navegar a otra pagina
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated:true});
    }
  }
  // REGISTRO
  async registro(fRegistro: NgForm){

    if (fRegistro.invalid){return;}

    const loading = await this.loadingController.create({
      message: 'Por favor espere...',
      //duration: 2000
    });
    await loading.present();

    if(this.registroUsuario.password1 !== this.registroUsuario.password2){
      await loading.dismiss();
      return this.uiServices.alertaInformativa('Las contraseñas no coinciden');

    }
    const valido = await this.usuarioService.registro(this.registroUsuario);
    await loading.dismiss();
    if(valido){
      // navegar a otra pagina
      this.mostrarSlideLogin();
      this.slides.slideTo(1);
    }
}
// RESET PASSWORD
async resetPassword(rPassword: NgForm){

  if (rPassword.invalid){return this.uiServices.alertaInformativa('Agregue un correo válido');}

  const loading = await this.loadingController.create({
    message: 'Por favor espere...',
    //duration: 2000
  });
  await loading.present();
  localStorage.clear();
  const valido = await this.usuarioService.resetPassword(this.resetPasswordObject);
  await loading.dismiss();
  if(valido){
    // navegar a otra pagina
    this.mostrarSlideConfirmResetPassword();
    this.slides.slideTo(3);
    // this.uiServices.alertaInformativa('Se ha restablecido su contraseña');
  }
}
// CONFIRM RESET PASSWORD
async confirmResetPassword(rContrasena: NgForm){

  if (rContrasena.invalid){return;}

  const loading = await this.loadingController.create({
    message: 'Por favor espere...',
    //duration: 2000
  });
  await loading.present();

  if(this.confirmResetPasswordObject.password1 !== this.confirmResetPasswordObject.password2){
    return this.uiServices.alertaInformativa('Las contraseñas no coinciden');
  }
  const valido = await this.usuarioService.retablecerContrasena(this.confirmResetPasswordObject);
  await loading.dismiss();
  if(valido){
    // navegar a otra pagina
    // this.uiServices.alertaInformativa('Se ha restablecido su contraseña');
    this.mostrarSlideLogin();
    this.slides.slideTo(0);
  }
}
refreshToken(){
  this.usuarioService.refreshToken();
}

async validaToken(){
  return await this.usuarioService.validaToken();
}


mostrarSlideLogin(){
  this.slides.lockSwipes(false);
  this.slides.slideTo(0);
  this.slides.lockSwipes(true);

}

mostrarSlideRegistro(){
  this.slides.lockSwipes(false);
  this.slides.slideTo(1);
  this.slides.lockSwipes(true);
}

mostrarSlideResetPassword(){
  this.slides.lockSwipes(false);
  this.slides.slideTo(2);
  this.slides.lockSwipes(true);
}
mostrarSlideConfirmResetPassword(){
  this.slides.lockSwipes(false);
  this.slides.slideTo(3);
  this.slides.lockSwipes(true);
}

}
