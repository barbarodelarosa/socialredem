import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
isLoading = false;
  constructor(private alertController: AlertController,
              private toastController: ToastController,
              public loadingController: LoadingController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading(duration?, message='Por favor espere...', dismiss=false) {
    this.isLoading = false;
    return await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'my-custom-class',
      message,
      duration
    }).then(a=>{
      a.present().then(()=>{
        console.log('Presented');
        if(!this.isLoading){
          a.dismiss().then(()=> console.log('Abort presenting'));
        }
      });
    });
  }
  async dismiss(){
    this.isLoading = false;
    return await this.loadingController.dismiss().then(()=>console.log('Dismissed'));
  }
    // await loading.present();

    // if (dismiss){
    //   loading.dismiss();
    // }

  //   const { role, data } = await loading.onDidDismiss();

  //   console.log('Loading dismissed!');
  // }

}
