import { Component } from '@angular/core';
import { DatalocalService } from '../../services/datalocal.service';
import { PruebasService } from '../../services/pruebas.service';
import { ModalController } from '@ionic/angular';
import { CrearPruebaImcComponent } from '../../components/crear-prueba-imc/crear-prueba-imc.component';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  slidesOpt = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
    pruebas: any[]=[];

  constructor(public dataLocalService: DatalocalService,
              public pruebasService: PruebasService,
              public modalCtrl: ModalController)  {
    this.pruebasService.getPruebasIMCByUser(2)
    .subscribe(resp=>{
      this.pruebas = resp.results;
      console.log(resp)
    }, error=>{console.log(error)})
  }
  async pruebaIMC(){
    console.log('Prueba IMC');
    const modal = await this.modalCtrl.create({
      component: CrearPruebaImcComponent,
      componentProps:{
        nombre: "La prueba esta ok"
      }
    });
    await modal.present();

    const data: any = await modal.onDidDismiss();
    console.log("La data de respuesta es:", data.data.resp);
    this.pruebas.unshift(data.data.resp);
  }

  

}
