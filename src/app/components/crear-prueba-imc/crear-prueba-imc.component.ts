import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { PruebasService } from '../../services/pruebas.service';

@Component({
  selector: 'app-crear-prueba-imc',
  templateUrl: './crear-prueba-imc.component.html',
  styleUrls: ['./crear-prueba-imc.component.scss'],
})
export class CrearPruebaImcComponent implements OnInit {

  constructor(private modalCtrl: ModalController,
              private pruebasService: PruebasService) { }
  fPruebaIMC: NgForm;
  pruebaIMC={
    talla: '',
    peso : ''
  }
  ngOnInit() {}

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  async calcularIMC(fPruebaIMC: NgForm){
    console.log(this.pruebaIMC);
    await this.pruebasService.createTestIMCByUser(this.pruebaIMC)
    .subscribe(resp=>{
    this.modalCtrl.dismiss({
      resp
    });
      console.log(resp);
    }, err=>{console.log(err);});
  }

}
