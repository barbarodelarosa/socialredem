import { Component, OnInit, Input } from '@angular/core';
import { PruebasService } from '../../services/pruebas.service';

@Component({
  selector: 'app-prueba-imc',
  templateUrl: './prueba-imc.component.html',
  styleUrls: ['./prueba-imc.component.scss'],
})
export class PruebaImcComponent implements OnInit {
  @Input() prueba: any={};
  private;
  constructor(private pruebasService: PruebasService) { }

  ngOnInit() {
    this.private = this.prueba.private
    console.log(this.private)
  }

  privateToogle(id){
    this.pruebasService.TooglePrivateIMC(id)
    .subscribe(resp=>{
      this.prueba.private = resp.private
    }, err=>{
      console.log(this.private)
      this.prueba.private = this.private
    })
  }

}
