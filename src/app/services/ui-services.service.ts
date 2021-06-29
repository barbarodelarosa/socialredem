import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

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
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
      duration
    });
    await loading.present();

    if (dismiss){
      loading.dismiss();
    }

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
