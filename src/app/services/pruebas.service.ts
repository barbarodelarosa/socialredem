import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiServiceService } from './ui-services.service';
import { environment } from '../../environments/environment';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  paginasPruebasIMC=0;
  constructor(private httpClient: HttpClient,
              private uiService: UiServiceService) { }

  getPruebasIMCByUser(idUser: number, pull: boolean = false){
    if(!pull){this.paginasPruebasIMC=0;}
    this.paginasPruebasIMC ++;
      return this.httpClient.get<any>(`${URL}/api/v1/imc/?owner=${idUser}&page=${this.paginasPruebasIMC}`);
  }
  
  createTestIMCByUser(pruebaIMC){
    return this.httpClient.post<any>(`${URL}/api/v1/imc/`,pruebaIMC);
  }

  TooglePrivateIMC(id){
    return this.httpClient.get<any>(`${URL}/api/v1/imc/${id}/private/`);
  }
}
