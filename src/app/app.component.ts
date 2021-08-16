import { Component, OnInit } from '@angular/core';


import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Location } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _location: Location,
    public alertController: AlertController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  });


  
  this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    console.log('Back press handler!');
    if (this._location.isCurrentPathEqualTo('/tabs/tab1')) {

      // Show Exit Alert!
      console.log('Show Exit Alert!');
      this.showExitConfirm();
      processNextHandler();
    } else {

      // Navigate to back page
      console.log('Navigate to back page');
      this._location.back();

    }

  });

  this.platform.backButton.subscribeWithPriority(5, () => {
    console.log('Handler called to force close!');
    this.alertController.getTop().then(r => {
      if (r) {
        navigator['app'].exitApp();
      }
    }).catch(e => {
      console.log(e);
    })
  });

}

showExitConfirm() {
  this.alertController.create({
    header: 'Cerrar Aplicación',
    message: '¿Desea cerrar de la aplicación?',
    backdropDismiss: false,
    buttons: [{
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Application exit prevented!');
      }
    }, {
      text: 'Salir',
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  })
    .then(alert => {
      alert.present();
    });
}

}
