import { Component, OnInit, Input } from '@angular/core';
import { PruebasService } from '../../services/pruebas.service';

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.scss'],
})
export class PruebasComponent implements OnInit {

  constructor(private pruebasService: PruebasService) { }
  @Input() pruebas: any[];
  ngOnInit() {
 
  }

}
