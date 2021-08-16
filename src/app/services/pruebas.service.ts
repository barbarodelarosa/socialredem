import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UiServiceService } from './ui-services.service';
import { environment } from '../../environments/environment';

const URL           = environment.url;
const EMOTION_STATE = environment.pathEmotionState;
@Injectable({
  providedIn: 'root'
})
export class PruebasService {

  paginasPruebasIMC=0;
  constructor(private httpClient: HttpClient,
              private uiService: UiServiceService) { }

  getPruebasIMCByUser(idUser: any, pull: boolean = false){
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

  evaluateEmotionState(emotion: any){
    return this.httpClient.post<any>(`${URL}${EMOTION_STATE}`, emotion);
  }
  getEmotionStateByUser(idUser){
    return this.httpClient.get<any>(`${URL}${EMOTION_STATE}?owner=${idUser}`);
  }
}
